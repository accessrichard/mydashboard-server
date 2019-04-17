
import { container } from "tfsclient/dist/inversify.config";
import { container as mockContainer } from "tfsclient/dist/inversify.mock.config";
import {
  IIterationApi,
  IIterationPath,
  IMember,
  INtlmAuth,
  ITeamApi,
  IWorkItemApi,
  IWorkItemFields,
  TYPES
} from "tfsclient/dist/src/types";
import config from "../config";
import { IWorkFilter } from "../types";

container.bind<string>(TYPES.BaseUrl).toConstantValue(config.work.baseUrl);
container.bind<INtlmAuth>(TYPES.AuthConfig).toConstantValue(config.work.auth);

const activeContainer = config.work.isDevMode ? mockContainer : container;

class WorkService {
  private workItemApi: IWorkItemApi;

  private iterationApi: IIterationApi;

  private teamApi: ITeamApi;

  constructor() {
    this.workItemApi = activeContainer.get<IWorkItemApi>(TYPES.WorkItemApi);
    this.iterationApi = activeContainer.get<IIterationApi>(TYPES.IterationApi);
    this.teamApi = activeContainer.get<ITeamApi>(TYPES.TeamApi);
  }

  public async getWork(): Promise<IWorkItemFields[]> {
    return await this.query({
      statuses: ["Active"],
      types: ["Bug"],
      users: ["@me"]
    });
  }

  public async query(filter: IWorkFilter): Promise<IWorkItemFields[]> {
    let queryStr = config.work.query;
    if (filter.users && filter.users.length > 0) {
      queryStr += ` and [System.AssignedTo] ${this.getUserClause(filter.users)}`;
    }

    if (filter.iterations) {
      queryStr += ` and [System.IterationPath] in ('${filter.iterations.join("\',\'")}')`;
    }

    if (filter.statuses) {
      queryStr += ` and [System.State] in ('${filter.statuses.join("\',\'")}')`;
    }

    if (filter.types) {
      queryStr += ` and [System.WorkItemType] in ('${filter.types.join("\',\'")}')`;
    }

    console.log(queryStr);

    return await this.workItemApi.getWorkItemsByQuery(queryStr);
  }

  public async getWorkItem(id: number): Promise<IWorkItemFields> {
    return await this.workItemApi.getExpandedWorkItem(id);
  }

  public async getIterations(): Promise<IIterationPath[]> {
    return await this.iterationApi.getIterationsByTeam(config.work.project, config.work.teams);
  }

  public async getCurrentIterations(): Promise<IIterationPath[]> {
    return await this.iterationApi.getCurrentIterations(config.work.project, config.work.teams);
  }

  public async getMembers(): Promise<string[]> {
    const members = await this.teamApi.getTeamMembers(config.work.project, config.work.teams);
    return members.map((member) => member.displayName);
  }

  private getUserClause(users: string[]): string {
    if (users.length === 1 && users.includes("@me")) {
      return " = @me";
    }

    return "in ('" + users.join("','") + "')";
  }
}

export default WorkService;
