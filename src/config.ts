import path from "path";

export default {
  app: {
    devCorsAllowedUrl: "*",
    port: 8082
  },
  todo: {
    path: path.join(process.cwd(), "data", "todo.json")
  },
   wiki: {
    directory: path.join(process.cwd(), "data"),
    extension: ".md"
  },
};
