import './ExpenseList.scss'
import createElement from '../../utils/createElement';
import { ClassMap, ExpenseColumn } from '../../constants/htmlConstants';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { getAllExpenses } from '../../utils/getModalApi';
import ExpenseItem from './ExpenseItem/ExpenseItem';
class ExpenseList {
  protected modeValue: MODE;

  protected readonly lang: LANG;

  protected readonly currency: CURRENCY;
  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public render(): HTMLElement {
    const expenseTitle = createElement({
      tag: 'h2',
      classList: [ClassMap.dashboard.expenseTitle],
      key: DictionaryKeys.transactionTitle,
      content: Dictionary[this.lang].transactionTitle,
    });

    const expenseHeaderItem = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expenseHeaderItem],
    });

    for (let i = 0; i < ExpenseColumn.length; i++) {
      const column = createElement({
        tag: 'div',
        key: DictionaryKeys[ExpenseColumn[i]],
        content: Dictionary[this.lang][ExpenseColumn[i]],
      })
      expenseHeaderItem.append(column);
    }

    const expenseList = createElement({
      tag: 'ul',
      classList: [ClassMap.dashboard.expenseList, ClassMap.mode[this.modeValue].font]
    });

    const expenseSection = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.expenseSection, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font],
    })

    expenseSection.append(expenseTitle, expenseHeaderItem, expenseList);

    this.createExpenseItem(expenseList);

    return expenseSection;
  }

  private async createExpenseItem(parentElement: HTMLElement) {
    const allExpenses = await getAllExpenses();
    const list: HTMLElement[] = allExpenses
      .reverse()
      .map((expense) => new ExpenseItem(expense))
      .map((expense) => expense.render());

    if (parentElement instanceof HTMLElement) {
      if (allExpenses.length === 0) {
        parentElement.textContent = 'пусто';
      } else {
        parentElement.innerHTML = '';
        list.forEach((expense) => parentElement.append(expense));
      }
    }
  }

}

export default ExpenseList;
