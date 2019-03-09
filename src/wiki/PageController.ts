import express from "express";
import { NextFunction, Request, Response } from "express";
import PageService from "./PageService";

class PageController {
  public path = "/wiki";
  public router = express.Router();
  private service: PageService;

  constructor() {
    this.service = new PageService();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    const route = this.path + "/:page";
    this.router.post(route, this.create.bind(this));
    this.router.get(route, this.get.bind(this));
    this.router.get(this.path, this.pages.bind(this));
    this.router.delete(route, this.delete.bind(this));
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await this.service.savePage(request.params.page, request.body.pageContent);
      response.redirect(this.path + "/" + request.params.page);
    } catch (e) {
      next(e);
    }
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const page = await this.service.getPage(request.params.page);
      response.json({ page });
    } catch (e) {
      next(e);
    }
  }

  public async pages(request: Request, response: Response, next: NextFunction) {
    try {
      const pages = await this.service.getPages();
      response.json({ pages });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await this.service.deletePage(request.params.page);
      response.json({ isSuccess: true });
    } catch (e) {
      next(e);
    }
  }
}

export default PageController;
