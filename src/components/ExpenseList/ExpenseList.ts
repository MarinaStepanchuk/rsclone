import './ExpenseList.scss';
import createElement from '../../utils/createElement';
import {
  ClassMap,
  ExpenseColumn, IdMap,
  InputType,
  InputValue,
} from '../../constants/htmlConstants';
import { CURRENCY, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import ExpenseItem from './ExpenseItem/ExpenseItem';
import { IExpense, IFilterParams } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { getAllAccounts, getAllExpenses } from '../../utils/getModalApi';

class ExpenseList {
  private static limit = InputValue.limitPage;

  private static page = 1;

  protected modeValue: MODE;

  protected readonly currency: CURRENCY;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  private filterParams: IFilterParams = {
    limit: ExpenseList.limit,
    page: ExpenseList.page,
    sort: 'date',
    order: 'DESC',
  };

  public async render(): Promise<HTMLElement> {
    const expenseTitle = createElement({
      tag: 'h2',
      classList: [ClassMap.dashboard.expenseTitle],
      key: DictionaryKeys.transactionTitle,
      content: Dictionary[AppState.lang].transactionTitle,
    });

    const paginationLimitLabel = createElement({
      tag: 'label',
      key: DictionaryKeys.paginationLimit,
      content: Dictionary[AppState.lang].paginationLimit,
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
        content: Dictionary[AppState.lang][ExpenseColumn[i]],
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

    const actualElements = await this.createExpenseItem(expenseList);
    this.createPagination(expenseSection);

    expenseSection.style.minHeight = `${132 + 41 * actualElements}px`;

    return expenseSection;
  }

  private async createExpenseItem(parentElement: HTMLElement): Promise<number> {
    const allExpenses = await this.getFilteredExpenses(this.filterParams);

    if (parentElement instanceof HTMLElement) {
      if (allExpenses.length === 0) {
        const emptyExpenseList = createElement({
          tag: 'div',
          classList: [ClassMap.dashboard.emptyExpenseList, ClassMap.mode[this.modeValue].font],
          key: DictionaryKeys.emptyExpenseList,
          content: Dictionary[AppState.lang].emptyExpenseList,
        });

        parentElement.append(emptyExpenseList);
      } else {
        parentElement.replaceChildren();
        allExpenses
          .map((expense) => new ExpenseItem(expense, this.deleteItem))
          .map((expense) => expense.render())
          .forEach((expense) => parentElement.append(expense));
      }
    }
    return allExpenses.length;
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
        const filterParamsPagination = Object.assign(this.filterParams);
        filterParamsPagination.page = ExpenseList.page + 1;

        const filteredExpenses = this.getFilteredExpenses(filterParamsPagination);

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

  private async getFilteredExpenses(filterParams: IFilterParams): Promise<IExpense[]> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, filterParams);

    return expensesData;
  }

  public static async updateExpenseList(): Promise<void> {
    const parentElem = document.querySelector(`#${IdMap.expenseList}`);
    const expenseList = await new ExpenseList().render();
    parentElem?.replaceChildren(expenseList);
  }

  private async deleteItem(expense: IExpense): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    if (expense._id) {
      await RequestApi.delete(Endpoint.EXPENSE, userToken, expense._id);
    }

    await ExpenseList.updateExpenseList();

    await ExpenseList.updateTotalAccount(expense);

    const expenseBalances = document.querySelector(`.${ClassMap.dashboard.expenseTotal}`) as Element;

    if (expenseBalances) {
      const allExpenses = await getAllExpenses();
      const res = allExpenses.reduce((acc, curr) => acc + curr.expense, 0);
      expenseBalances.textContent = `${res}`;
    }
  }

  private static async updateTotalAccount(expense: IExpense): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accounts = await getAllAccounts();
    const card = accounts.filter((account) => account.account === expense.account).pop();
    const cardId = card?._id as string;

    const changedCardAccount: { updateSum: number } = {
      updateSum: +expense.expense,
    };

    await RequestApi.updateSum(
      Endpoint.ACCOUNT,
      userToken,
      cardId,
      changedCardAccount,
    );

    const accountBalance = document.querySelector(`#${IdMap.accountBalance}`) as HTMLElement;

    const allAccounts = await getAllAccounts();
    const amount = allAccounts.reduce((acc, curr) => acc + curr.sum, 0);

    accountBalance.textContent = `${amount}`;
  }
}

export default ExpenseList;
