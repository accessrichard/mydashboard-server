import express from "express";
import { NextFunction, Request, Response } from "express";
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
    this.router.get(`${this.path}/mywork`, this.getMyWork.bind(this));
    this.router.get(`${this.path}/item/:id`, this.getWorkItem.bind(this));
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getWork();
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async getMyWork(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getMyWork();
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async getIterations(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getWork();
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
}

export default WorkController;
