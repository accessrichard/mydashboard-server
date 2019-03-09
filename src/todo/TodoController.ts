import express from "express";
import { NextFunction, Request, Response } from "express";
import TodoService from "./TodoService";

class TodoController {
  public path = "/todo";
  public router = express.Router();
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  public async get(request: Request, response: Response, next: NextFunction) {
    try {
      const todos = await this.service.getTodos();
      response.json(todos);
    } catch (e) {
      next(e);
    }
  }

  public async post(request: Request, response: Response, next: NextFunction) {
    try {
      const todos = await this.service.saveTodos(request.body.todos);
      response.json({ todos });
    } catch (e) {
      next(e);
    }
  }
}

export default TodoController;
