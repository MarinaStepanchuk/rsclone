import {
  FormatDateString,
  LANG,
  MODE,
  SortCategory,
  SortOrder,
} from './types';

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
  readonly _id?: string,
  readonly __v?: number,
  readonly userId?: string,
  date: Date,
  account: string,
  income: number,
  currency?: string,
  comment?: string,
}

export interface IFilterParams {
  startDate?: string,
  endDate?: string,
  account?: string,
  category?: string,
  currency?: string,
  page?: number,
  limit?: number,
  sort?: SortCategory,
  order?: SortOrder,
}

export interface IAccount {
  readonly _id?: string,
  readonly __v?: number,
  readonly userId?: string,
  account: string,
  icon: string,
  sum: number,
  key?: string,
  currency?: string,
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
  startDate: FormatDateString,
  endDate: FormatDateString,
}

export interface IMenuItem {
  path: string,
  name: string,
  image: string,
  key: string,
}

export interface IBalances {
  totalBalance: HTMLElement,
  totalAccountBalance: HTMLElement,
}

export interface ICurrency {
  icon: string,
  key: string,
  amount: number,
  currency: string,
}

export interface ICurrencyResponseRates {
  USD: number,
  RUB: number,
  BYN: number,
  EUR: number,
  CHF: number,
  CNY: number,
  GEL: number,
}
export interface ICurrencyResponse {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: ICurrencyResponseRates,
}
