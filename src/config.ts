import path from "path";

export default {
  app: {
    devCorsAllowedUrl: "*",
    port: 8082
  },
  contact: {
    path: path.join(process.cwd(), "data", "contact.json"),
  },
  todo: {
    path: path.join(process.cwd(), "data", "todo.json")
  },
  wiki: {
    directory: path.join(process.cwd(), "data", "wiki"),
    extension: ".md"
  }
};
