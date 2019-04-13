
import { container } from "tfsclient/dist/inversify.config";
import { container as mockContainer } from "tfsclient/dist/inversify.mock.config";
import { IWorkItemApi, TYPES } from "tfsclient/dist/src/types";
import { INtlmAuth, IWorkItemFields } from "tfsclient/dist/src/types";
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
    return await this.workItemApi.getWorkItemsByQuery(config.work.queryAllActive);
  }

  public async getMyWork(): Promise<IWorkItemFields[]> {
    return await this.workItemApi.getWorkItemsByQuery(config.work.queryMyWork);
  }

  public async getWorkItem(id: number): Promise<IWorkItemFields> {
    return await this.workItemApi.getExpandedWorkItem(id);
  }
}

export default WorkService;
