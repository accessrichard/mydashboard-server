import fs from "fs";
import path from "path";
import { promisify } from "util";
import config from "../config";
import { ITodo } from "./../types";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class TodoService {
  public async getTodos(): Promise<ITodo[]> {
    const file = readFileAsync(config.todo.path, { encoding: "utf8" });
    return file.then((contents) => {
      return JSON.parse(contents);
    });
  }

  public async addTodo(todo: any): Promise<ITodo> {
    const todos = await this.getTodos();
    todo.id = this.getNewId(todos);
    todos.push(todo);
    writeFileAsync(config.todo.path, JSON.stringify(todos));
    return todo;
  }

  public async deleteTodo(id: number): Promise<ITodo> {
    const todos = await this.getTodos();
    const todoIndex = todos
      .map((todoItem) => {
        return todoItem.id;
      })
      .indexOf(id);

    const deleted = todos[todoIndex]
    todos.splice(todoIndex, 1);
    writeFileAsync(config.todo.path, JSON.stringify(todos));
    return deleted;
  }

  private isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  private getNewId(todos: ITodo[]) {
    const ids = todos.map((x) => (this.isNumeric(x.id) ? x.id : 0));
    const max = ids.length === 0 ? 0 : Math.max(...ids);
    return max + 1;
  }
}

export default TodoService;
