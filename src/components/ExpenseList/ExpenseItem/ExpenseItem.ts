import { IExpense } from '../../../types/interfaces';
import createElement from '../../../utils/createElement';
import { ClassMap } from '../../../constants/htmlConstants';
import createDateValue from '../../../utils/createDateValue';
import { Dictionary, DictionaryKeys } from '../../../constants/dictionary';
import { CURRENCY, LANG, MODE } from '../../../types/types';
import AppState from '../../../constants/appState';
import { LocalStorageKey } from '../../../constants/common';
import { CurrencyMark } from '../../../types/enums';

class ExpenseItem {
  private readonly lang: LANG;

  private modeValue: MODE;

  private readonly currency: CURRENCY;

  constructor(private expense: IExpense) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public render(): HTMLElement {
    let commentText = this.expense.comment;

    if (!commentText) {
      commentText = '';
    }

    const date = createElement({
      tag: 'div',
      content: createDateValue(this.expense.date),
    });

    const category = createElement({
      tag: 'div',
      key: DictionaryKeys[(this.expense.category).toLowerCase()],
      content: Dictionary[this.lang][(this.expense.category).toLowerCase()],
    });

    const amount = createElement({
      tag: 'div',
      content: `${this.expense.expense} ${CurrencyMark[this.currency]}`,
    });

    const account = createElement({
      tag: 'div',
      key: DictionaryKeys[(this.expense.account).toLowerCase()],
      content: Dictionary[this.lang][(this.expense.account).toLowerCase()],
    });

    const comment = createElement({
      tag: 'div',
      content: `${commentText}`,
    });

    const expenseItem = createElement({
      tag: 'li',
      classList: [ClassMap.dashboard.expenseItem],
    });

    expenseItem.append(
      date,
      category,
      amount,
      account,
      comment,
    );

    return expenseItem;
  }
}

export default ExpenseItem;
