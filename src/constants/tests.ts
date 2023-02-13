import { IAccount, ICategory } from '../types/interfaces';

export const Accounts: IAccount[] = [
  {
    _id: 'Cash',
    account: 'Cash',
    icon: 'cash',
    sum: 4650,
  },
  {
    _id: 'Card',
    account: 'Card',
    icon: 'card',
    sum: 2380,
  },
];

export const Categories: ICategory[] = [
  {
    _id: 'Transport',
    name: 'Transport',
    icon: 'transport',
    sum: 350,
  },
  {
    _id: 'Clothes',
    name: 'Clothes',
    icon: 'clothes',
    sum: 40,
  },
  {
    _id: 'Entertainment',
    name: 'Entertainment',
    icon: 'entertainment',
    sum: 110,
  },
  {
    _id: 'Food',
    name: 'Food',
    icon: 'food',
    sum: 420,
  },
  {
    _id: 'Eating',
    name: 'Eating out',
    icon: 'cafe',
    sum: 210,
  },
  {
    _id: 'Health',
    name: 'Health',
    icon: 'health',
    sum: 20,
  },
  {
    _id: 'House',
    name: 'House',
    icon: 'house',
    sum: 150,
  },
  {
    _id: 'Sport',
    name: 'Sport',
    icon: 'sport',
    sum: 78,
  },
];
