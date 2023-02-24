import './ExpenseList.scss';
import createElement from '../../utils/createElement';
import {
  ClassMap,
  ExpenseColumn,
  InputType,
  InputValue,
} from '../../constants/htmlConstants';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import ExpenseItem from './ExpenseItem/ExpenseItem';
import { IExpense, IFilterParams } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';

class ExpenseList {
  private static limit = InputValue.limitPage;

  private static page = 1;

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

    const paginationLimitLabel = createElement({
      tag: 'label',
      key: DictionaryKeys.paginationLimit,
      content: Dictionary[this.lang].paginationLimit,
    });

    const paginationLimitInput = createElement({
      tag: 'input',
      classList: [ClassMap.dashboard.paginationInput, ClassMap.mode[this.modeValue].font],
    }) as HTMLInputElement;

    paginationLimitInput.type = InputType.number;
    paginationLimitInput.min = InputValue.minNum;
    paginationLimitInput.value = `${ExpenseList.limit}`;
    paginationLimitInput.max = InputValue.maxLimitPage;

    const paginationLimitPage = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expensePaginationWrap],
    });

    paginationLimitPage.append(paginationLimitLabel, paginationLimitInput);

    const paginationButtonLeft = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.paginationButton, ClassMap.dashboard.paginationButtonLeft],
      content: '<',
    });

    const paginationButtonRight = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.paginationButton, ClassMap.dashboard.paginationButtonRight],
      content: '>',
    });

    const paginationPageNum = createElement({
      tag: 'span',
      classList: [ClassMap.dashboard.paginationPageNum, ClassMap.mode[this.modeValue].font],
      content: `${ExpenseList.page}`,
    });

    const paginationWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expensePaginationWrap],
    });

    paginationWrap.append(paginationButtonLeft, paginationPageNum, paginationButtonRight);

    const expenseTitleWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expenseTitleWrap],
    });

    expenseTitleWrap.append(expenseTitle, paginationLimitPage, paginationWrap);

    const expenseHeaderItem = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expenseHeaderItem],
    });

    for (let i = 0; i < ExpenseColumn.length; i += 1) {
      const column = createElement({
        tag: 'div',
        key: DictionaryKeys[ExpenseColumn[i]],
        content: Dictionary[this.lang][ExpenseColumn[i]],
      });

      expenseHeaderItem.append(column);
    }

    const expenseList = createElement({
      tag: 'ul',
      classList: [ClassMap.dashboard.expenseList, ClassMap.mode[this.modeValue].font],
    });

    const expenseSection = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.expenseSection, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font],
    });

    expenseSection.append(expenseTitleWrap, expenseHeaderItem, expenseList);

    this.createExpenseItem(expenseList);
    this.createPagination(expenseSection);

    return expenseSection;
  }

  private async createExpenseItem(parentElement: HTMLElement) {
    const allExpenses = await this.getFilteredExpenses(ExpenseList.limit, ExpenseList.page);
    const list: HTMLElement[] = allExpenses
      .map((expense) => new ExpenseItem(expense))
      .map((expense) => expense.render());

    if (parentElement instanceof HTMLElement) {
      if (allExpenses.length === 0) {
        const emptyExpenseList = createElement({
          tag: 'div',
          classList: [ClassMap.dashboard.emptyExpenseList, ClassMap.mode[this.modeValue].font],
          key: DictionaryKeys.emptyExpenseList,
          content: Dictionary[this.lang].emptyExpenseList,
        });

        parentElement.append(emptyExpenseList);
      } else {
        parentElement.replaceChildren();
        list.forEach((expense) => parentElement.append(expense));
      }
    }
  }

  private async createPagination(expenseSection: HTMLElement) {
    const pagePaginationRight = expenseSection.querySelector(`.${ClassMap.dashboard.paginationButtonRight}`);
    const pagePaginationLeft = expenseSection.querySelector(`.${ClassMap.dashboard.paginationButtonLeft}`);
    const pageLimit = expenseSection.querySelector(`.${ClassMap.dashboard.paginationInput}`) as HTMLInputElement;

    pageLimit?.addEventListener('change', () => {
      ExpenseList.limit = Number(pageLimit.value);
      ExpenseList.updateExpenseList();
    });

    pagePaginationLeft?.addEventListener('click', () => {
      const pageNum = expenseSection.querySelector(`.${ClassMap.dashboard.paginationPageNum}`);

      if (pageNum && ExpenseList.page > 1) {
        ExpenseList.page -= 1;
        pageNum.textContent = `${ExpenseList.page}`;
        ExpenseList.updateExpenseList();
      }
    });

    pagePaginationRight?.addEventListener('click', () => {
      const pageNum = expenseSection.querySelector(`.${ClassMap.dashboard.paginationPageNum}`);

      if (pageNum) {
        const filteredExpenses = this.getFilteredExpenses(ExpenseList.limit, ExpenseList.page + 1);

        filteredExpenses.then((expenses) => {
          if (expenses.length > 0) {
            ExpenseList.page += 1;
            pageNum.textContent = `${ExpenseList.page}`;
            ExpenseList.updateExpenseList();
          }
        });
      }
    });
  }

  private async getFilteredExpenses(limit: number, page: number): Promise<IExpense[]> {
    const params: IFilterParams = {
      limit,
      page,
    };

    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }

  public static updateExpenseList(): void {
    const expenseListWrap = document.querySelector(`.${ClassMap.dashboard.expenseSection}`);
    const parentElem = document.querySelector(`.${ClassMap.dashboard.mainDashboard}`);

    const expenseList = new ExpenseList().render();

    expenseListWrap?.remove();
    parentElem?.append(expenseList);
  }
}

export default ExpenseList;
