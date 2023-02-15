import './WalletCategories.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark, SectionWallet } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { Categories } from '../../constants/tests';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';
import createIconBlock from '../../utils/createIconBlock';

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

  public render(): HTMLElement {
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

    sum.innerText = `${this.getCategoriesAmount()} ${CurrencyMark[this.currency]}`;

    header.append(title, sum);

    const categoriesBlock = this.getCategoriesBlock();

    this.section?.replaceChildren(header, categoriesBlock);

    return this.section as HTMLElement;
  }

  private getCategoriesAmount(): number {
    // const data = this.getCategories();
    // const amount = data.reduce((accum, category) => accum + category.sum, 0);
    // return amount;
    return 0;
  }

  private getCategories() {
    // БЭК получаем карты с балансами
    return Categories;
  }

  private getCategoriesBlock(): HTMLElement {
    const categoriesBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.itemContainer],
    });

    const data = this.getCategories();
    const categories = data.map(((category) => createIconBlock(category, SectionWallet.category)));

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

    categoriesBlock.replaceChildren(...categories, plusContainer);

    return categoriesBlock;
  }
}

export default WalletCategories;
