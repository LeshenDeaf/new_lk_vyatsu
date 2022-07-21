export interface IUser {
  id: number;
  login: string;
  groups: number[];
  fio: IFio;
}

export interface IFio {
  first_name: string;
  last_name: string;
  second_name?: string;
  full?: string;
}
