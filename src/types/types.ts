export type LANG = 'RU' | 'EN' | 'DE';

export type MODE = 'light' | 'dark';

export type CURRENCY = 'USD' | 'EUR' | 'RUB' | 'BYN';

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`;
export type FormatDateString = `${number}-${MM}-${DD}`;

export type SortCategory = 'date' | 'expense' | 'income' | 'category';
export type SortOrder = 'ASC' | 'DESC';
