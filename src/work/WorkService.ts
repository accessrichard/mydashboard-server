
import { container } from "tfsclient/dist/inversify.config";
import { container as mockContainer } from "tfsclient/dist/inversify.mock.config";
import TfsHttp from "tfsclient/dist/src/TfsHttp";
import { IWorkItemApi, TYPES } from "tfsclient/dist/src/types";
import { INtlmAuth, IWorkItemFields } from "tfsclient/dist/src/types";
import WorkItemApi from "tfsclient/dist/src/WorkItemApi";
import config from "../config";

container.bind<string>(TYPES.BaseUrl).toConstantValue(config.work.baseUrl);
container.bind<INtlmAuth>(TYPES.AuthConfig).toConstantValue(config.work.auth);

const activeContainer = config.work.isDevMode ? mockContainer : container;

class WorkService {
  private workItemApi: IWorkItemApi;

  constructor() {
    this.workItemApi = activeContainer.get<IWorkItemApi>(TYPES.WorkItemApi);
  }

  public async getWork(): Promise<IWorkItemFields[]> {
    const query =
      "select [System.Id] from WorkItems where [System.State] = 'Active' and [System.AssignedTo] = @me";
    return await this.workItemApi.getWorkItemsByQuery(query);
  }

  public async getWorkItem(id: number): Promise<IWorkItemFields> {
    return await this.workItemApi.getExpandedWorkItem(id);
  }
}

export default WorkService;
