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
  createDate: Date;
  completeDate: Date;
  content: string;
  id: number;
  title: string;
  type: string;
}

export interface ILinkCategory {
  text: string;
  links: ILink[];
}

export interface ILink {
  href: string;
  text: string;
}
