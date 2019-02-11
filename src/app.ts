import express from "express";
import path from "path";
import config from "./config";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(this.corsDevelopment);
    this.app.use(this.logErrorsToConsole);
    this.app.use(this.errorHandler);
  }

  private corsDevelopment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const env = process.env.NODE_ENV || "dev";
    if (env !== "dev") {
      next();
      return;
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private logErrorsToConsole(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.error(err.stack);
    next(err);
  }

  private errorHandler(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.status(500);
    res.render("error", { error: err });
  }
}

export default App;
