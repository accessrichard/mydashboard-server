import express from "express";
import { NextFunction, Request, Response } from "express";
import { IIterationPath } from "tfsclient/dist/src/types";
import WorkService from "./WorkService";

class WorkController {
  public path = "/work";
  public router = express.Router();
  private service: WorkService;

  constructor() {
    this.service = new WorkService();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(`${this.path}/list`, this.get.bind(this));
    this.router.post(`${this.path}/query`, this.query.bind(this));
    this.router.get(`${this.path}/item/:id`, this.getWorkItem.bind(this));
    this.router.get(`${this.path}/iterations`, this.getIterations.bind(this));
    this.router.get(`${this.path}/members`, this.getMembers.bind(this));
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getWork();
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async query(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.query(request.body.filter);
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async getIterations(request: Request, response: Response, next: NextFunction) {
    try {
      let contact: IIterationPath[];
      if (request.params.active) {
        contact = await this.service.getCurrentIterations();
      } else {
        contact = await this.service.getIterations();
      }

      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async getWorkItem(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getWorkItem(request.params.id);
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async getMembers(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getMembers();
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }
}

export default WorkController;
