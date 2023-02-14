import { ICategory, IAccount } from '../types/interfaces';

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

export const defaultCategories: ICategory[] = [
  {
    category: 'Transport',
    icon: 'transport',
    sum: 0,
    key: 'transport',
  },
  {
    category: 'Clothes',
    icon: 'clothes',
    sum: 0,
    key: 'clothes',
  },
  {
    category: 'Entertainment',
    icon: 'entertainment',
    sum: 0,
    key: 'entertainment',
  },
  {
    category: 'Food',
    icon: 'food',
    sum: 0,
    key: 'food',
  },
  {
    category: 'Eating out',
    icon: 'cafe',
    sum: 0,
    key: 'eatingOut',
  },
  {
    category: 'Health',
    icon: 'health',
    sum: 0,
    key: 'health',
  },
  {
    category: 'House',
    icon: 'house',
    sum: 0,
    key: 'house',
  },
  {
    category: 'sport',
    icon: 'sport',
    sum: 0,
    key: 'sport',
  },
];

export const defaultAccounts: IAccount[] = [
  {
    account: 'Cash',
    icon: 'cash',
    sum: 0,
    key: 'cash',
  },
  {
    account: 'Card',
    icon: 'card',
    sum: 0,
    key: 'card',
  },
];
