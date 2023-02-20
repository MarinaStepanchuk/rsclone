import { ICategory, IAccount } from '../types/interfaces';
import { FormatDateString } from '../types/types';

export const minRangeDate: FormatDateString = '2000-01-01';
export const todayDate: FormatDateString = new Date().toISOString().split('T')[0] as FormatDateString;

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

export const defaultAccounts: IAccount[] = [
  {
    account: 'Cash',
    sum: 0,
    icon: 'cash',
    key: 'cash',
  },
  {
    account: 'Card',
    sum: 0,
    icon: 'card',
    key: 'card',
  },
];

export const defaultCategories: ICategory[] = [
  {
    category: 'Transport',
    icon: 'transport',
    limit: 0,
    key: 'transport',
  },
  {
    category: 'Clothes',
    icon: 'clothes',
    limit: 0,
    key: 'clothes',
  },
  {
    category: 'Eating out',
    icon: 'cafe',
    limit: 0,
    key: 'cafe',
  },
  {
    category: 'Entertainment',
    icon: 'entertainment',
    limit: 0,
    key: 'entertainment',
  },
  {
    category: 'Food',
    icon: 'food',
    limit: 0,
    key: 'food',
  },
  {
    category: 'Health',
    icon: 'health',
    limit: 0,
    key: 'health',
  },
  {
    category: 'House',
    icon: 'house',
    limit: 0,
    key: 'house',
  },
  {
    category: 'Sport',
    icon: 'sport',
    limit: 0,
    key: 'sport',
  },
];
