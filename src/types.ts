export interface IContact {
  name: string;
  cellPhone: string;
  workPhone: string;
  email: string;
  link: string;
  color: string;
  isFavorite: boolean;
  lastupadate: Date;
}

export interface ITodo {
  createDate: Date;
  completeDate: Date;
  content: string;
  id: number;
  title: string;
  type: string;
}
