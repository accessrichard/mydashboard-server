import fs from "fs";
import path from "path";
import { promisify } from "util";
import config from "../config";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const deleteAsync = promisify(fs.unlink);
const readddirAsync = promisify(fs.readdir);

class PageService {
  public async getPage(pageName: string): Promise<string> {
    this.validate(pageName);
    const filePath = this.getFilePath(pageName);
    return await readFileAsync(filePath, { encoding: "utf8" });
  }

  public async getPages(): Promise<string[]> {
    const files = await readddirAsync(config.wiki.directory);

    return await files
      .filter((file: string) => {
        return file.endsWith(config.wiki.extension);
      })
      .map((file) => {
        return file.replace(".txt", "");
      });
  }

  public async savePage(pageName: string, pageContent: string): Promise<void> {
    this.validate(pageName);
    const filePath = this.getFilePath(pageName);
    await writeFileAsync(filePath, pageContent);
    await this.archivePage(pageName, pageContent);
  }

  public async deletePage(pageName: string): Promise<void> {
    this.validate(pageName);
    const filePath = this.getFilePath(pageName);
    await deleteAsync(filePath);
  }

  private async archivePage(pageName: string, contents: string) {
    this.validate(pageName);
    const archiveName = pageName + "-" + this.getOsWriteableDateTime();
    const archiveAbsPath = path.join(this.getArchivePath(), archiveName);
    await writeFileAsync(archiveAbsPath, contents);
  }

  private getOsWriteableDateTime() {
    const dt = new Date().toISOString();
    return dt.replace(new RegExp(":|\\.", "g"), "-");
  }

  private getArchivePath(name: string = null): string {
    const archivePath = path.join(config.wiki.directory, "archive");
    if (name === null) {
      return archivePath;
    }

    return path.join(archivePath, this.addExtension(name));
  }

  private getFilePath(pageName: string): string {
    return path.join(config.wiki.directory, this.addExtension(pageName));
  }

  private addExtension(pageName: string): string {
    return pageName + config.wiki.extension;
  }

  private validate(pageName: string): void {
    if (!this.isValidPageName(pageName)) {
      throw new Error("Page name can only contain alphanumeric characters.");
    }
  }

  private isValidPageName(pageName: string): boolean {
    const re = new RegExp("^[\\w_-\\s]+$");
    return re.test(pageName);
  }
}

export default PageService;
