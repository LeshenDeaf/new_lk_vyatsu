export interface IUser {
  id: number;
  login: string;
  groups: number[];
  fio: IFio;
  rights: IRights;
  logged_as: ILoggedAs;
}

export interface ILoggedAs extends Omit<IUser, "logged_as"> {
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

export interface IStudentInfo {
  fio: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  age: number;
  group_name: string;
  faculty_short: string;
  faculty_full: string;
  course: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  is_last_course: 0 | 1;
  email: string;
  phone: string;
  direction_code: string;
  direction_name: string;
  profile_name: string;
  edu_form: string;
  form_ob: string;
  level_name: string;
  tech_name: string;
  stud_type: string;
  is_pvz: boolean;
  contract: string;
  is_in_hostel: boolean;
  citizenship: string;
  pasp: StudentPasp;
}

interface StudentPasp {
  ser: string;
  number: string;
  date: string;
  podr: string;
  podr_code: string;
}

export interface IPasport {
  ser: string;
  nubmer: string;
}
