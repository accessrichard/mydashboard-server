import express from "express";
import { NextFunction, Request, Response } from "express";
import LinkService from "./LinkService";

class LinkController {
  public path = "/link";
  public router = express.Router();
  private service: LinkService;

  constructor() {
    this.service = new LinkService();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.get.bind(this));
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const links = await this.service.getLinks();
      response.json(links);
    } catch (e) {
      next(e);
    }
  }
}

export default LinkController;
