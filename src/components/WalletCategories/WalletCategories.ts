import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { ClassMap, startId } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Currency } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ICategory } from '../../types/interfaces';

const Categories = [
  {
    id: 'Transport',
    name: 'Transport',
    icon: 'transport',
    sum: 350,
  },
  {
    id: 'Clothes',
    name: 'Clothes',
    icon: 'clothes',
    sum: 40,
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    icon: 'entertainment',
    sum: 110,
  },
  {
    id: 'Food',
    name: 'Food',
    icon: 'food',
    sum: 420,
  },
  {
    id: 'Eating',
    name: 'Eating out',
    icon: 'cafe',
    sum: 210,
  },
  {
    id: 'Health',
    name: 'Health',
    icon: 'health',
    sum: 20,
  },
  {
    id: 'House',
    name: 'House',
    icon: 'house',
    sum: 150,
  },
  {
    id: 'Sport',
    name: 'Sport',
    icon: 'sport',
    sum: 78,
  },
];

class WalletCategories {
  private modeValue: MODE;

  private lang: LANG;

  private section: HTMLElement | null = null;

  private currency: CURRENCY;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    this.init();
  }

  private init(): void {
    this.section = createElement({
      tag: 'div',
      classList: [...ClassMap.wallet.category.wrapper, ClassMap.mode[this.modeValue].font],
    });
  }

  public render(): HTMLElement {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.category.header, ClassMap.mode[this.modeValue].title],
    });

    const title = createElement({
      tag: 'span',
      key: DictionaryKeys.categoriesTitle,
      content: Dictionary[this.lang].categoriesTitle,
    });

    const sum = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.category.sum],
    });

    sum.innerText = `${this.getCategoriesAmount()} ${Currency[this.currency]}`;

    header.append(title, sum);

    const categoriesBlock = this.getCategoriesBlock();

    this.section?.replaceChildren(header, categoriesBlock);

    return this.section as HTMLElement;
  }

  private getCategoriesAmount(): number {
    const data = this.getCategories();
    const amount = data.reduce((accum, category) => accum + category.sum, 0);
    return amount;
  }

  private getCategories() {
    // БЭК получаем карты с балансами
    return Categories;
  }

  private getCategoriesBlock(): HTMLElement {
    const categoriesBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.category.container],
    });

    const data = this.getCategories();
    const categories = data.map(((category) => this.createCategoryItem(category)));

    const plusCategory = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.icon],
    });

    plusCategory.innerHTML = SvgIcons.category.plus;

    categoriesBlock.replaceChildren(...categories, plusCategory);

    return categoriesBlock;
  }

  private createCategoryItem(category: ICategory): HTMLElement {
    const {
      id, name, icon, sum,
    } = category;

    const item = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.item],
      id: id as string,
    });

    const itemTitle = Dictionary[this.lang][name] && DictionaryKeys[name]
      ? createElement({
        tag: 'span',
        classList: [ClassMap.wallet.category.title],
        key: DictionaryKeys[category.name],
        content: Dictionary[this.lang][category.name],
      })
      : createElement({
        tag: 'span',
        classList: [ClassMap.wallet.category.title],
        content: name,
      });

    const itemIcon = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.icon, ClassMap.wallet.category.icon],
    });

    itemIcon.innerHTML = SvgIcons.category[icon] ? SvgIcons.category[icon] : SvgIcons.category.base;

    const itemAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.category.balance],
      content: `${sum} ${Currency[this.currency]}`,
    });

    item.replaceChildren(itemTitle, itemIcon, itemAmount);

    return item;
  }

  public updateComponent() {
    this.render();
  }
}

export default WalletCategories;
