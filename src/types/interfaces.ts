import { LANG, MODE } from './types';

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
  phoneNumber: number | null;
}

export interface IExpense {
  readonly _id?: string,
  readonly __v?: number,
  readonly userId?: string,
  date: Date,
  account: string,
  category: string,
  expense: number,
  currency: string,
  comment?: string,
}

export interface IIncome {
  readonly _id: string,
  readonly __v: number,
  readonly userId: string,
  date: Date,
  account: string,
  income: number,
  currency: string,
  comment?: string,
}

export interface IAccount {
  readonly _id?: string,
  readonly __v?: number,
  readonly userId?: string,
  account: string,
  icon: string,
  sum?: number,
  key?: string,
}

export interface ICategory {
  readonly _id?: string,
  readonly __v?: number,
  readonly userId?: string,
  category: string,
  icon: string,
  limit?: number,
  key?: string,
}

export interface ISupportMsg {
  username: string;
  email: string;
  message: string;
}

export interface IApplicationState {
  isUserLogin: boolean;
  modeValue: MODE;
  lang: LANG;
  userAccount: string | null;
}

export interface IMenuItem {
  path: string,
  name: string,
  image: string,
  key: string,
}

export interface IAccount {
  _id?: string,
  account: string,
  sum: number,
  icon: string,
  userId?: string,
  key?: string,
}

export interface ICategory {
  _id?: string,
  category: string,
  icon: string,
  sum: number,
  key?: string,
}
