import App from "./app";
import config from "./config";
import PageController from "./wiki/PageController";

const app = new App([new PageController()], config.app.port);

app.listen();
