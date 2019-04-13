import fs from "fs";
import path from "path";
import { promisify } from "util";
import config from "../config";
import { IContact } from "../types";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class ContactService {
  public async getContacts(): Promise<IContact[]> {
    const file = readFileAsync(config.contact.path, { encoding: "utf8" });
    return file.then((contents) => {
      return JSON.parse(contents);
    });
  }

  public async getContact(name: string): Promise<IContact> {
    const contacts = this.getContacts();
    return contacts.then((x: IContact[]) => {
      return x.find((contact: IContact) => {
        return contact.name === name;
      });
    });
  }

  public async delete(name: string): Promise<IContact> {
    const contacts = await this.getContacts();
    const contactIndex = contacts
      .map((c) => {
        return c.name;
      })
      .indexOf(name);

    const deleted = contacts[contactIndex];
    contacts.splice(contactIndex, 1);
    writeFileAsync(config.contact.path, JSON.stringify(contacts));
    return deleted;
  }

  public async saveContact(contact: IContact): Promise<IContact> {
    if (!contact.color) {
      contact.color = this.getColor();
    }

    let contacts = await this.getContacts();
    contact.lastupadate = new Date();
    if (contact.id === 0) {
      contact.id = this.getNextId(contacts);
    }

    const isExisting = contacts.find((c) => {
      return c.name === contact.name;
    });

    if (isExisting) {
      contacts = contacts.map((existingContact: IContact) =>
        existingContact.name === contact.name ? contact : existingContact
      );
    } else {
      contacts.push(contact);
    }

    writeFileAsync(config.contact.path, JSON.stringify(contacts));
    return contact;
  }

  private getColor(): string {
    const rand = Math.floor(Math.random() * 6);
    const colors = ["red", "blue", "green", "orange", "pink", "teal"];
    return colors[rand];
  }

  private getNextId(contacts: IContact[]) {
    const ids = contacts.map((c) => {
      return c.id;
    });

    return Math.max(...ids) + 1;
  }
}

export default ContactService;
