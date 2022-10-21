export interface IUser {
  id: number;
  login: string;
  groups: number[];
  fio: IFio;
  rights: IRights;
  logged_as: ILoggedAs;
}

export interface ILoggedAs extends IUser {
  info: IEmployeeInfo | IStudentInfo;
}

export interface IFio {
  first_name: string;
  last_name: string;
  second_name?: string;
  full?: string;
}

export interface IRights {
  is_student: boolean;
  is_employee: boolean;
  is_admin: boolean;
}

export interface IEmployeeInfo {
  tabnum: number;
  fio: string;
  fio_small: string;
  birthday: string;
  pasp: IPasport;
  snils: string;
  inn: string;
  age: number;
}

export interface IStudentInfo {}

export interface IPasport {
  ser: string;
  nubmer: string;
}
