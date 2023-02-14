import { IAccount, ICategory } from '../types/interfaces';

export const Accounts: IAccount[] = [
  {
    _id: 'Cash',
    account: 'Cash',
    icon: 'cash',
    sum: 4650,
    key: 'cash',
  },
  {
    _id: 'Card',
    account: 'Card',
    icon: 'card',
    sum: 2380,
    key: 'card',
  },
];

export const Categories: ICategory[] = [
  {
    _id: 'Transport',
    category: 'Transport',
    icon: 'transport',
    sum: 350,
    key: 'transport',
  },
  {
    _id: 'Clothes',
    category: 'Clothes',
    icon: 'clothes',
    sum: 40,
    key: 'clothes',
  },
  {
    _id: 'Entertainment',
    category: 'Entertainment',
    icon: 'entertainment',
    sum: 110,
    key: 'entertainment',
  },
  {
    _id: 'Food',
    category: 'Food',
    icon: 'food',
    sum: 420,
    key: 'food',
  },
  {
    _id: 'Eating',
    category: 'Eating out',
    icon: 'cafe',
    sum: 210,
    key: 'eatingOut',
  },
  {
    _id: 'Health',
    category: 'Health',
    icon: 'health',
    sum: 20,
    key: 'health',
  },
  {
    _id: 'House',
    category: 'House',
    icon: 'house',
    sum: 150,
    key: 'house',
  },
  {
    _id: 'Sport',
    category: 'Sport',
    icon: 'sport',
    sum: 78,
    key: 'sport',
  },
];
