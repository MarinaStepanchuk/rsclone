import { IExpense } from '../../../types/interfaces';
import ExpenseList from '../ExpenseList';
import createElement from '../../../utils/createElement';
import {ClassMap, ExpenseColumn} from '../../../constants/htmlConstants';
import { createDateValue } from '../../../utils/createDateValue';
import {Dictionary, DictionaryKeys} from '../../../constants/dictionary';
import {CURRENCY, LANG, MODE} from "../../../types/types";
import AppState from "../../../constants/appState";
import {LocalStorageKey} from "../../../constants/common";

class ExpenseItem {
  private lang: LANG;

  private modeValue: MODE;

  private currency: CURRENCY;

  constructor(private expense: IExpense) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }
 public render(): HTMLElement {
    const date = createElement({
      tag: 'div',
      content: createDateValue(this.expense.date),
    })

   console.log(this.expense.category);
   console.log(DictionaryKeys[(this.expense.category).toLowerCase()]);

   const category = createElement({
     tag: 'div',
     key: DictionaryKeys[(this.expense.category).toLowerCase()],
     content: Dictionary[this.lang][(this.expense.category).toLowerCase()],
   })

    const expenseItem = createElement({
      tag: 'li',
      classList: [ClassMap.dashboard.expenseHeaderItem],
    })

   expenseItem.append(date, category)

   return expenseItem;

 }
}

export default ExpenseItem;
