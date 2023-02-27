import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { alertTimeout, colorLimit, LocalStorageKey } from '../../constants/common';
import { CurrencyMark } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { ICategory, IExpense, IFilterParams } from '../../types/interfaces';
import WalletPeriodSelect from '../WalletPeriodSelect/WalletPeriodSelect';
import Preloader from '../Preloader/Preloader';
import UpdaterCategory from '../../modals/UpdaterCategory/UpdaterCategory';
import ChartCategoriesPie from '../ChartCategoriesPie/ChartCategoriesPie';

class WalletCategories {
  private modeValue: MODE;

  private lang: LANG;

  private section: HTMLElement | null = null;

  private sum: HTMLElement | null = null;

  private categoriesBlock: HTMLElement | null = null;

  private alertContainer: HTMLElement | null = null;

  private currency: CURRENCY;

  constructor(private updateCategoriesBlock: () => void, private updateAccountsBlock: () => void) {
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

    this.alertContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.alertContainer],
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
    const defaultEndDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    header.append(sumContainer, periodContainer);

    await this.fillCategoriesBlock(defaultStartDate, defaultEndDate);

    this.section?.replaceChildren(header, this.alertContainer as HTMLElement, this.categoriesBlock as HTMLElement);

    this.countCategoriesAmount();

    this.section?.addEventListener('select', async (event) => {
      const customEvent = event as CustomEvent;
      const button = document.querySelector(`.${ClassMap.customSelect.title}`) as HTMLElement;
      button.setAttribute(Attribute.key, customEvent.detail.key);
      const currentDate = new Date(new Date().setDate(new Date().getDate() + 1));
      const endDate = currentDate.toISOString().split('T')[0];

      if (customEvent.detail.key === DictionaryKeys.walletPeriodYear) {
        const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
        await this.updateChart(startDate, endDate);
      }

      if (customEvent.detail.key === DictionaryKeys.walletPeriodMonth) {
        const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
        await this.updateChart(startDate, endDate);
      }

      if (customEvent.detail.key === DictionaryKeys.walletPeriodCurrentMonth) {
        const startDate = new Date(new Date().setDate(1)).toISOString().split('T')[0];
        await this.fillCategoriesBlock(startDate, endDate);
        this.countCategoriesAmount();
        await this.updateChart(startDate, endDate);
      }
    });

    this.categoriesBlock?.addEventListener('click', async (event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest(`.${ClassMap.wallet.image}`) && !targetElement.classList.contains(`.${ClassMap.wallet.plus}`) && !targetElement.closest(`.${ClassMap.wallet.plus}`)) {
        const id = targetElement.closest(`.${ClassMap.wallet.item}`)?.id as string;
        const category = await this.getCategory(id);

        if (category) {
          const modal = new UpdaterCategory(category, this.updateCategoriesBlock, this.updateAccountsBlock).render();
          const section = document.querySelector(`.${ClassMap.main}`);
          section?.append(modal as HTMLElement);
        }
      }
    });

    return this.section as HTMLElement;
  }

  private async getCategory(id: string): Promise<ICategory | null> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const category: ICategory | null = await RequestApi.get(Endpoint.CATEGORY, userToken, id);

    return category;
  }

  private async updateChart(startDate: string, endDate: string): Promise<void> {
    const newChart = new ChartCategoriesPie(new Date(startDate), new Date(endDate));
    const chart = document.querySelector(`.${ClassMap.wallet.chart}`);

    const chartTitle = createElement({
      tag: 'span',
      classList: [ClassMap.analytic.title, ClassMap.mode[this.modeValue].title],
      key: DictionaryKeys.chartCategoriesPieTitle,
      content: Dictionary[this.lang].chartCategoriesPieTitle,
    });

    chart?.replaceChildren(chartTitle, await newChart.render());
    newChart.addChart();
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

    const preloader = new Preloader(categoriesBlock);
    preloader.render();

    const data = await this.getCategories();

    const categories = data.map((async (category) => {
      const block = await this.createIconBlock(category, start, end);
      return block;
    }));

    const allCategories = await Promise.all(categories);

    preloader.remove();

    categoriesBlock.append(...allCategories);

    const plusContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item, ClassMap.wallet.plus],
    });

    const plusCategory = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.image, ClassMap.wallet.lightIcon],
    });

    plusCategory.innerHTML = SvgIcons.category.plus;
    plusContainer.append(plusCategory);

    plusCategory.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorCategory(this.getCategories, this.updateCategoriesBlock).render();
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

    let sum = 0;

    const monthlyExpenses = await this.getExpensesCategory(name, start, end);
    if (monthlyExpenses.length > 0) {
      monthlyExpenses.forEach((expenses) => {
        sum += expenses.expense;
      });
      itemAmount.innerText = `${sum} ${CurrencyMark[this.currency]}`;
    } else {
      itemAmount.innerText = `0 ${CurrencyMark[this.currency]}`;
    }

    if (data.limit) {
      if (data.limit < sum) {
        itemIcon.style.backgroundColor = colorLimit.excess;

        const alert = createElement({
          tag: 'div',
          classList: [
            ClassMap.wallet.alert,
          ],
          content: `${Dictionary[this.lang].limitAlert} ${data.category}`,
        });
        this.alertContainer?.append(alert);
        setTimeout(() => alert.remove(), alertTimeout);
      }
    }

    item.replaceChildren(itemTitle, itemIcon, itemAmount);

    return item;
  }

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
