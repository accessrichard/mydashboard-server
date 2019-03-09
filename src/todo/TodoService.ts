import fs from "fs";
import path from "path";
import { promisify } from "util";
import config from "../config";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class TodoService {
  public async getTodos(): Promise<string> {
    const file = readFileAsync(config.todo.path, { encoding: "utf8" });
    return file.then((contents) => {
        return JSON.parse(contents);
    });
  }

  public async saveTodos(todos: any): Promise<void> {
     writeFileAsync(config.todo.path, JSON.stringify(todos));
  }
}

export default TodoService;
