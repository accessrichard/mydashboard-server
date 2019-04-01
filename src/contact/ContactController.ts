import express from "express";
import { NextFunction, Request, Response } from "express";
import ContactService from "./ContactService";

class ContactController {
  public path = "/contact";
  public router = express.Router();
  private service: ContactService;

  constructor() {
    this.service = new ContactService();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.list.bind(this));
    this.router.get(`${this.path}/:name`, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
    this.router.delete(this.path + "/:name", this.delete.bind(this));
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.getContact(request.params.name);
      response.json(contact);
    } catch (e) {
      next(e);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.delete(request.params.name);
      response.json({ contact });
    } catch (e) {
      next(e);
    }
  }

  public async list(request: Request, response: Response, next: NextFunction) {
    try {
      const contacts = await this.service.getContacts();
      response.json(contacts);
    } catch (e) {
      next(e);
    }
  }

  public async post(request: Request, response: Response, next: NextFunction) {
    try {
      const contact = await this.service.saveContact(request.body.contact);
      response.json({ contact });
    } catch (e) {
      next(e);
    }
  }
}

export default ContactController;
