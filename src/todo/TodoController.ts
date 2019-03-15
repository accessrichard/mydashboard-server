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
    this.router.delete(this.path + "/:id", this.delete.bind(this));
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
      const todo = await this.service.addTodo(request.body.todo);
      response.json({ todo });
    } catch (e) {
      next(e);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id, 10);
      const todo = await this.service.deleteTodo(id);
      response.json({ todo });
    } catch (e) {
      next(e);
    }
  }
}

export default TodoController;
