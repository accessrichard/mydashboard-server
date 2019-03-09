import App from "./app";
import config from "./config";
import TodoController from "./todo/TodoController";
import PageController from "./wiki/PageController";

const app = new App(
  [new PageController(), new TodoController()],
  config.app.port
);

app.listen();
