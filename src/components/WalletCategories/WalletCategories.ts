import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Currency } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ICategory } from '../../types/interfaces';
import { Categories } from '../../constants/tests';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';

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

    plusCategory.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorCategory(this.getCategories, this.updateAccountsBlock).render();
      section?.append(modal as HTMLElement);
    });

    categoriesBlock.replaceChildren(...categories, plusCategory);

    return categoriesBlock;
  }

  private createCategoryItem(category: ICategory): HTMLElement {
    const {
      _id: id, name, icon, sum,
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
