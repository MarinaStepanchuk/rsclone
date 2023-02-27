import '../ExpenseList/ExpenseList.scss';
import './IncomeList.scss';
import {
  ClassMap,
  IdMap,
  IncomeColumn,
  InputType,
  InputValue,
} from '../../constants/htmlConstants';
import { CURRENCY, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import createElement from '../../utils/createElement';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IFilterParams, IIncome } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { getAllAccounts, getAllIncomes } from '../../utils/getModalApi';
import IncomeItem from './IncomeItem/IncomeItem';

class IncomeList {
  private static limit = InputValue.limitPage;

  private static page = 1;

  protected modeValue: MODE;

  protected readonly currency: CURRENCY;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  private filterParams: IFilterParams = {
    limit: IncomeList.limit,
    page: IncomeList.page,
    sort: 'date',
    order: 'DESC',
  };

  public async render(): Promise<HTMLElement> {
    const incomeTitle = createElement({
      tag: 'h2',
      classList: [ClassMap.dashboard.expenseTitle],
      key: DictionaryKeys.incomeListTitle,
      content: Dictionary[AppState.lang].incomeListTitle,
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
    paginationLimitInput.value = `${IncomeList.limit}`;
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
      content: `${IncomeList.page}`,
    });

    const paginationWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expensePaginationWrap],
    });

    paginationWrap.append(paginationButtonLeft, paginationPageNum, paginationButtonRight);

    const incomeTitleWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expenseTitleWrap],
    });

    incomeTitleWrap.append(incomeTitle, paginationLimitPage, paginationWrap);

    const incomeHeaderItem = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.expenseHeaderItem, ClassMap.dashboard.incomeHeaderItem],
    });

    for (let i = 0; i < IncomeColumn.length; i += 1) {
      const column = createElement({
        tag: 'div',
        key: DictionaryKeys[IncomeColumn[i]],
        content: Dictionary[AppState.lang][IncomeColumn[i]],
      });

      incomeHeaderItem.append(column);
    }

    const incomeList = createElement({
      tag: 'ul',
      classList: [ClassMap.dashboard.expenseList, ClassMap.mode[this.modeValue].font],
    });

    const incomeSection = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.expenseSection, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font],
    });

    incomeSection.append(incomeTitleWrap, incomeHeaderItem, incomeList);

    const actualElements = await this.createIncomeItem(incomeList);
    this.createPagination(incomeSection);

    incomeSection.style.minHeight = `${132 + 41 * actualElements}px`;

    return incomeSection;
  }

  private async createIncomeItem(parentElement: HTMLElement): Promise<number> {
    const allIncomes = await this.getFilteredIncomes(this.filterParams);

    if (parentElement instanceof HTMLElement) {
      if (allIncomes.length === 0) {
        const emptyIncomeList = createElement({
          tag: 'div',
          classList: [ClassMap.dashboard.emptyExpenseList, ClassMap.mode[this.modeValue].font],
          key: DictionaryKeys.emptyIncomeList,
          content: Dictionary[AppState.lang].emptyIncomeList,
        });

        parentElement.append(emptyIncomeList);
      } else {
        parentElement.replaceChildren();
        allIncomes
          .map((income) => new IncomeItem(income, this.deleteItem))
          .map((income) => income.render())
          .forEach((income) => parentElement.append(income));
      }
    }
    return allIncomes.length;
  }

  private async getFilteredIncomes(filterParams: IFilterParams): Promise<IIncome[]> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const incomesData: IIncome[] = await RequestApi.getFiltered(Endpoint.INCOME, userToken, filterParams);

    return incomesData;
  }

  public static async updateIncomeList(): Promise<void> {
    const parentElem = document.querySelector(`#${IdMap.incomeList}`);
    const incomeList = await new IncomeList().render();
    parentElem?.replaceChildren(incomeList);
  }

  private async deleteItem(income: IIncome) {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    if (income._id) {
      await RequestApi.delete(Endpoint.INCOME, userToken, income._id);
    }
    await IncomeList.updateIncomeList();

    await IncomeList.updateTotalAccount(income);

    const incomeBalances = document.querySelector(`.${ClassMap.dashboard.incomeTotal}`) as Element;

    if (incomeBalances) {
      const allIncomes = await getAllIncomes();
      const res = allIncomes.reduce((acc, curr) => acc + curr.income, 0);
      incomeBalances.textContent = `${res}`;
    }
  }

  private static async updateTotalAccount(income: IIncome): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accounts = await getAllAccounts();
    const card = accounts.filter((account) => account.account === income.account).pop();
    const cardId = card?._id as string;

    const changedCardAccount: { updateSum: number } = {
      updateSum: -income.income,
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

  private async createPagination(incomeSection: HTMLElement) {
    const pagePaginationRight = incomeSection.querySelector(`.${ClassMap.dashboard.paginationButtonRight}`);
    const pagePaginationLeft = incomeSection.querySelector(`.${ClassMap.dashboard.paginationButtonLeft}`);
    const pageLimit = incomeSection.querySelector(`.${ClassMap.dashboard.paginationInput}`) as HTMLInputElement;

    pageLimit?.addEventListener('change', () => {
      IncomeList.limit = Number(pageLimit.value);
      IncomeList.updateIncomeList();
    });

    pagePaginationLeft?.addEventListener('click', () => {
      const pageNum = incomeSection.querySelector(`.${ClassMap.dashboard.paginationPageNum}`);

      if (pageNum && IncomeList.page > 1) {
        IncomeList.page -= 1;
        pageNum.textContent = `${IncomeList.page}`;
        IncomeList.updateIncomeList();
      }
    });

    pagePaginationRight?.addEventListener('click', () => {
      const pageNum = incomeSection.querySelector(`.${ClassMap.dashboard.paginationPageNum}`);

      if (pageNum) {
        const filterParamsPagination = Object.assign(this.filterParams);
        filterParamsPagination.page = IncomeList.page + 1;

        const filteredIncomes = this.getFilteredIncomes(filterParamsPagination);

        filteredIncomes.then((incomes) => {
          if (incomes.length > 0) {
            IncomeList.page += 1;
            pageNum.textContent = `${IncomeList.page}`;
            IncomeList.updateIncomeList();
          }
        });
      }
    });
  }
}

export default IncomeList;
