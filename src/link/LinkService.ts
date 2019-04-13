import fs from "fs";
import { promisify } from "util";
import config from "../config";
import { ILinkCategory } from "../types";

const readFileAsync = promisify(fs.readFile);

class LinkService {
  public async getLinks(): Promise<ILinkCategory[]> {
    const file = readFileAsync(config.link.path, { encoding: "utf8" });
    return file.then((contents) => {
      return JSON.parse(contents);
    });
  }
}

export default LinkService;
