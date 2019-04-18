export interface IContact {
  name: string;
  cellPhone: string;
  workPhone: string;
  email: string;
  link: string;
  color: string;
  isFavorite: boolean;
  lastupadate: Date;
  id: number;
}

export interface ITodo {
  createDate?: Date;
  completeDate?: Date;
  id?: number;
  title: string;
  routerLinkUrl?: string;
  urlName?: string;
}

export interface ILinkCategory {
  text: string;
  links: ILink[];
}

export interface ILink {
  href: string;
  text: string;
}

export interface IWorkFilter {
  iterations?: string[];
  users?: string[];
  statuses?: string[];
  types?: string[];
  text?: string;
}
