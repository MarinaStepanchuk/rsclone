import { IAccount, ICategory } from '../types/interfaces';

export const LANG_ATTRIBUTE = 'lang';

export const RegularExpressions = {
  Email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/gm,
  Name: /^([а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,}[ ][а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,}|[а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,})/gm,
  Password: /^[0-9a-zA-Z-!@#$%^&*]{5,}/gm,
};

export const alertTimeout = 2000;

export const Currency = ['USD', 'RUB', 'BYN', 'EUR'];

export const defaultState = {
  mode: 'light',
  lang: 'EN',
};

export const LocalStorageKey = {
  mode: 'modeYT',
  lang: 'langYT',
  auth: 'auth',
};

export const Mode = {
  dark: 'dark',
  light: 'light',
};

export const defaultAccountCash: IAccount = {
  account: 'Cash',
  sum: 0,
  icon: 'cash',
};

export const defaultAccountCard: IAccount = {
  account: 'Card',
  sum: 0,
  icon: 'card',
};

export const defaultAccounts: IAccount[] = [
  { account: 'Cash', sum: 0, icon: 'cash' },
  { account: 'Card', sum: 0, icon: 'card' },
];

export const defaultExpenseCategories: ICategory[] = [
  { category: 'Transport', icon: 'transport' },
  { category: 'Clothes', icon: 'clothes' },
  { category: 'Eating out', icon: 'cafe' },
  { category: 'Entertainment', icon: 'entertainment' },
  { category: 'Food', icon: 'food' },
  { category: 'Health', icon: 'health' },
  { category: 'House', icon: 'house' },
  { category: 'Sport', icon: 'sport' },
];
