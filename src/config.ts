import path from "path";
import { INtlmAuth } from "tfsclient/dist/src/types";

export default {
  app: {
    devCorsAllowedUrl: "*",
    port: 8082
  },
  contact: {
    path: path.join(process.cwd(), "data", "contact.json")
  },
  link: {
    path: path.join(process.cwd(), "data", "link.json")
  },
  todo: {
    path: path.join(process.cwd(), "data", "todo.json")
  },
  wiki: {
    directory: path.join(process.cwd(), "data", "wiki"),
    extension: ".md"
  },
  work: {
    auth: {} as INtlmAuth,
    baseUrl: "",
    isDevMode: true,
    project: "",
    queryAllActive: "select [System.Id] from WorkItems where [System.State] = 'Active'",
    queryMyWork: "select [System.Id] from WorkItems where [System.State] = 'Active' and [System.AssignedTo] = @me",
    teams: [""]
  }
};
