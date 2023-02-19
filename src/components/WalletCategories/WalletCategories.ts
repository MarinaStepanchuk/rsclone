import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark, SectionWallet } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { ICategory, IExpense, IFilterParams } from '../../types/interfaces';

class WalletCategories {
  private modeValue: MODE;

  private lang: LANG;

  private section: HTMLElement | null = null;

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
  }

  public async render(): Promise<HTMLElement> {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitle, ClassMap.mode[this.modeValue].title],
    });

    const title = createElement({
      tag: 'span',
      key: DictionaryKeys.categoriesTitle,
      content: Dictionary[this.lang].categoriesTitle,
    });

    const sum = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.sum],
    });

    // sum.innerText = `${await this.getCategoriesAmount()} ${CurrencyMark[this.currency]}`;

    header.append(title, sum);

    const categoriesBlock = await this.getCategoriesBlock();

    this.section?.replaceChildren(header, categoriesBlock);

    return this.section as HTMLElement;
  }

  private async getCategories(): Promise<ICategory[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const categoriesData: ICategory[] = await RequestApi.getAll(Endpoint.CATEGORY, userToken);
    return categoriesData;
  }

  private async getCategoriesBlock(): Promise<HTMLElement> {
    const categoriesBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.itemContainer],
    });

    const data = await this.getCategories();

    const categories = data.map((async (category) => {
      const block = await this.createIconBlock(category, SectionWallet.category);
      return block;
    }));

    const allCategories = await Promise.all(categories);

    categoriesBlock.append(...allCategories);

    const plusContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item, ClassMap.wallet.plusIconCategory],
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

    return categoriesBlock;
  }

  private async createIconBlock(data: ICategory, type: SectionWallet): Promise<HTMLElement> {
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

    if (type === SectionWallet.category) {
      itemIcon.classList.add(ClassMap.wallet.lightIcon);
    }

    itemIcon.innerHTML = SvgIcons[type][icon] ? SvgIcons[type][icon] : SvgIcons[type].base;

    const itemAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.balance],
    });

    const allExpenses = await this.getAllExpensesCategory(name);

    if (allExpenses.length > 0) {
      let sum = 0;
      allExpenses.forEach((expenses) => {
        sum += expenses.expense;
      });
      itemAmount.innerText = `${sum} ${CurrencyMark[this.currency]}`;
    } else {
      itemAmount.innerText = `0 ${CurrencyMark[this.currency]}`;
    }

    const itemMonthlAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.balance],
    });

    const monthlyExpenses = await this.getMonthlyExpensesCategory(name);
    if (monthlyExpenses.length > 0) {
      let sum = 0;
      monthlyExpenses.forEach((expenses) => {
        sum += expenses.expense;
      });
      itemMonthlAmount.innerText = `${sum} ${CurrencyMark[this.currency]}`;
    } else {
      itemMonthlAmount.innerText = `0 ${CurrencyMark[this.currency]}`;
    }

    item.replaceChildren(itemTitle, itemIcon, itemAmount, itemMonthlAmount);

    return item;
  }

  private async getAllExpensesCategory(categoryName: string): Promise<IExpense[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    const params: IFilterParams = {
      category: categoryName,
    };

    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }

  private async getMonthlyExpensesCategory(categoryName: string): Promise<IExpense[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    const start = new Date(new Date().setDate(1));
    const end = new Date();

    const params: IFilterParams = {
      startDate: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
      endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
      category: categoryName,
    };

    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }
}

export default WalletCategories;
