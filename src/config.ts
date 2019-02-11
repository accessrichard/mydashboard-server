import path from "path";

export default {
  app: {
    devCorsAllowedUrl: "*",
    port: 8081
  },
  wiki: {
    directory: path.join(process.cwd(), "data"),
    extension: ".txt"
  }
};
