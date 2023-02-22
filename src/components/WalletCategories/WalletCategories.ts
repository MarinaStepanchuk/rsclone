import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { ICategory, IExpense, IFilterParams } from '../../types/interfaces';
import WalletPeriodSelect from '../WalletPeriodSelect/WalletPeriodSelect';

class WalletCategories {
  private modeValue: MODE;

  private lang: LANG;

  private section: HTMLElement | null = null;

  private sum: HTMLElement | null = null;

  private categoriesBlock: HTMLElement | null = null;

  private currency: CURRENCY;

  constructor(private updateAccountsBlock: () => void) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    this.init();
  }

  private init(): void {
    this.section = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.section, ClassMap.wallet.categoriesSection, ClassMap.mode[this.modeValue].font],
    });

    this.sum = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.sum],
    });

    this.categoriesBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.itemContainer],
    });
  }

  public async render(): Promise<HTMLElement> {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitle, ClassMap.mode[this.modeValue].title],
    });

    const periodTitle = createElement({
      tag: 'span',
      key: DictionaryKeys.walletPeriodTitle,
      content: Dictionary[this.lang].walletPeriodTitle,
    });

    const selectPeriod = new WalletPeriodSelect().render();

    const periodContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitleItem],
    });

    periodContainer.append(periodTitle, selectPeriod);

    const sumTitle = createElement({
      tag: 'span',
      key: DictionaryKeys.categoriesTitle,
      content: Dictionary[this.lang].categoriesTitle,
    });

    const sumContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitleItem],
    });

    sumContainer.append(sumTitle, this.sum as HTMLElement);

    const defaultStartDate = new Date(new Date().setDate(1)).toISOString().split('T')[0];
    const defaultEndDate = new Date().toISOString().split('T')[0];
    header.append(sumContainer, periodContainer);

    await this.fillCategoriesBlock(defaultStartDate, defaultEndDate);

    this.section?.replaceChildren(header, this.categoriesBlock as HTMLElement);

    this.countCategoriesAmount();

    this.section?.addEventListener('select', async (event) => {
      const customEvent = event as CustomEvent;
      const button = document.querySelector(`.${ClassMap.customSelect.title}`) as HTMLElement;
      button.setAttribute(Attribute.key, customEvent.detail.key);
      const currentDate = new Date();
      const endDate = currentDate.toISOString().split('T')[0];

      if (customEvent.detail.key === DictionaryKeys.walletPeriodYear) {
        const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
      }

      if (customEvent.detail.key === DictionaryKeys.walletPeriodMonth) {
        const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
      }

      if (customEvent.detail.key === DictionaryKeys.walletPeriodCurrentMonth) {
        const startDate = new Date(new Date().setDate(1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
      }
    });

    return this.section as HTMLElement;
  }

  private async getCategories(): Promise<ICategory[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const categoriesData: ICategory[] = await RequestApi.getAll(Endpoint.CATEGORY, userToken);
    return categoriesData;
  }

  private countCategoriesAmount(): void {
    const categories = [...(this.section as HTMLElement).querySelectorAll(`.${ClassMap.wallet.balance}`)];
    const amount = categories.reduce((acc, value) => acc + Number(value.textContent?.split(' ')[0]), 0);
    (this.sum as HTMLElement).innerText = `${amount} ${CurrencyMark[this.currency]}`;
  }

  private async fillCategoriesBlock(start: string, end: string): Promise<void> {
    const categoriesBlock = this.categoriesBlock as HTMLElement;
    categoriesBlock.innerHTML = '';
    const data = await this.getCategories();

    const categories = data.map((async (category) => {
      const block = await this.createIconBlock(category, start, end);
      return block;
    }));

    const allCategories = await Promise.all(categories);

    categoriesBlock.append(...allCategories);

    const plusContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item],
    });

    const plusCategory = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.image, ClassMap.wallet.lightIcon],
    });

    plusCategory.innerHTML = SvgIcons.category.plus;
    plusContainer.append(plusCategory);

    plusCategory.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorCategory(this.getCategories, this.updateAccountsBlock).render();
      section?.append(modal as HTMLElement);
    });

    categoriesBlock.append(plusContainer);
  }

  private async createIconBlock(data: ICategory, start: string, end: string): Promise<HTMLElement> {
    const {
      _id: id, icon, key = '', category: name,
    } = data;

    const item = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item],
      id: id as string,
    });

    const itemTitle = Dictionary[this.lang][key] && DictionaryKeys[key]
      ? createElement({
        tag: 'span',
        classList: [ClassMap.wallet.title],
        key: DictionaryKeys[key],
        content: Dictionary[this.lang][key],
      })
      : createElement({
        tag: 'span',
        classList: [ClassMap.wallet.title],
        content: name,
      });

    const itemIcon = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.image],
    });

    itemIcon.classList.add(ClassMap.wallet.lightIcon);

    itemIcon.innerHTML = SvgIcons.category[icon] ? SvgIcons.category[icon] : SvgIcons.category.base;

    const itemAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.balance],
    });

    const monthlyExpenses = await this.getExpensesCategory(name, start, end);
    if (monthlyExpenses.length > 0) {
      let sum = 0;
      monthlyExpenses.forEach((expenses) => {
        sum += expenses.expense;
      });
      itemAmount.innerText = `${sum} ${CurrencyMark[this.currency]}`;
    } else {
      itemAmount.innerText = `0 ${CurrencyMark[this.currency]}`;
    }

    item.replaceChildren(itemTitle, itemIcon, itemAmount);

    return item;
  }

  // private async getYearExpensesCategory(categoryName: string): Promise<IExpense[]> {
  //   const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

  //   const params: IFilterParams = {
  //     startDate: `${new Date().getFullYear() - 1}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  //     endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  //     category: categoryName,
  //   };

  //   const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

  //   return expensesData;
  // }

  // private async getCurrentMonthlyExpensesCategory(categoryName: string): Promise<IExpense[]> {
  //   const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

  //   const params: IFilterParams = {
  //     startDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
  //     endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  //     category: categoryName,
  //   };

  //   const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

  //   return expensesData;
  // }

  private async getExpensesCategory(categoryName: string, start: string, end: string): Promise<IExpense[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    const params: IFilterParams = {
      startDate: start,
      endDate: end,
      category: categoryName,
    };

    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }
}

export default WalletCategories;
