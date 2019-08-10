import App from "./app";
import config from "./config";
import ContactController from "./contact/ContactController";
import LinkController from "./link/LinkController";
import TodoController from "./todo/TodoController";
import PageController from "./wiki/PageController";

const app = new App(
  [new PageController(),
  new TodoController(),
  new ContactController(),
  new LinkController()],
  config.app.port
);

app.listen();
