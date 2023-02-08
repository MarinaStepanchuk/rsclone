export interface IOptionsElement {
  tag: keyof HTMLElementTagNameMap,
  classList?: string[],
  content?: string,
  id?: string,
  key?: string,
}

export interface IValidation {
  element: HTMLInputElement,
  regularExpression: RegExp,
  errorMessage: string,
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  username: string;
  currency: string;
}

export interface IUserData {
  username: string;
  email: string;
  currency: string;
  avatar: string;
  language: string;
  phoneNumber: number | null;
}

export interface IExpense {
  _id: string,
  userId: string,
  date: Date,
  account: string,
  category: string,
  expense: number,
  currency: string,
  comment?: string,
}

export interface IIncome {
  _id: string,
  userId: string,
  date: Date,
  account: string,
  income: number,
  currency: string,
  comment?: string,
}

export interface IApplicationState {
  isUserLogin: boolean;
}

export interface IMenuItem {
  path: string,
  name: string,
  image: string,
}

export interface IModeItem {
  background: string,
  font: string,
  backgroundMenu: string,
  title: string,
}
