import { IExpense } from '../../../types/interfaces';
import createElement from '../../../utils/createElement';
import { ClassMap } from '../../../constants/htmlConstants';
import createDateValue from '../../../utils/createDateValue';
import { Dictionary, DictionaryKeys } from '../../../constants/dictionary';
import { CURRENCY, MODE } from '../../../types/types';
import AppState from '../../../constants/appState';
import { LocalStorageKey } from '../../../constants/common';
import { CurrencyMark } from '../../../types/enums';

class ExpenseItem {
  private modeValue: MODE;

  private readonly currency: CURRENCY;

  constructor(private expense: IExpense, private deleteFunction: (expense: IExpense) => void) {
    this.modeValue = AppState.modeValue;
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

    const category = this.createCategoryItem(this.expense.category, this.expense.category);

    const amount = createElement({
      tag: 'div',
      content: `${this.expense.expense} ${CurrencyMark[this.currency]}`,
    });

    const account = this.createCategoryItem(this.expense.account, this.expense.account);

    const comment = createElement({
      tag: 'div',
      content: `${commentText}`,
    });

    // const editButton = createElement({
    //   tag: 'button',
    //   classList: [ClassMap.dashboard.editButton],
    //   id: 'editButton',
    // }) as HTMLButtonElement;

    const deleteButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.deleteButton],
      id: 'deleteButton',
    }) as HTMLButtonElement;

    deleteButton?.addEventListener('click', () => {
      if (this.expense) {
        this.deleteFunction(this.expense);
      }
    });

    const buttonsWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.editButtonsWrap],
    });

    buttonsWrap.append(deleteButton);

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
      buttonsWrap,
    );

    return expenseItem;
  }

  private createCategoryItem(key: string, name: string): HTMLDivElement {
    let categoryItem;

    if (Dictionary[AppState.lang][key.toLowerCase()] && DictionaryKeys[key.toLowerCase()]) {
      categoryItem = createElement({
        tag: 'div',
        key: DictionaryKeys[key.toLowerCase()],
        content: Dictionary[AppState.lang][key.toLowerCase()],
      }) as HTMLDivElement;
    } else {
      categoryItem = createElement({
        tag: 'div',
        content: name,
      }) as HTMLDivElement;
    }

    return categoryItem;
  }
}

export default ExpenseItem;
