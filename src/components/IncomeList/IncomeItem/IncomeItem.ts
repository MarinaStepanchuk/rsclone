import { CURRENCY, MODE } from '../../../types/types';
import { IIncome } from '../../../types/interfaces';
import AppState from '../../../constants/appState';
import { LocalStorageKey } from '../../../constants/common';
import createElement from '../../../utils/createElement';
import createDateValue from '../../../utils/createDateValue';
import { CurrencyMark } from '../../../types/enums';
import { ClassMap } from '../../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../../constants/dictionary';

class IncomeItem {
  private modeValue: MODE;

  private readonly currency: CURRENCY;

  constructor(private income: IIncome, private deleteFunction: (income: IIncome) => void) {
    this.modeValue = AppState.modeValue;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public render(): HTMLElement {
    let commentText = this.income.comment;

    if (!commentText) {
      commentText = '';
    }

    const date = createElement({
      tag: 'div',
      content: createDateValue(this.income.date),
    });

    const amount = createElement({
      tag: 'div',
      content: `${this.income.income} ${CurrencyMark[this.currency]}`,
    });

    const account = this.createCategoryItem(this.income.account, this.income.account);

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
      if (this.income._id) {
        this.deleteFunction(this.income);
      }
    });

    const buttonsWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.editButtonsWrap],
    });

    buttonsWrap.append(deleteButton);

    const incomeItem = createElement({
      tag: 'li',
      classList: [ClassMap.dashboard.expenseItem, ClassMap.dashboard.incomeItem],
    });

    incomeItem.append(
      date,
      account,
      amount,
      comment,
      buttonsWrap,
    );

    return incomeItem;
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

export default IncomeItem;
