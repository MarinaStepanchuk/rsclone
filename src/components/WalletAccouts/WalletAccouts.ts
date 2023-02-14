import './WalletAccouts.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark, SectionWallet } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IAccount } from '../../types/interfaces';
import CreatorAccount from '../../modals/CreatorAccount/CreatorAccount';
import { Accounts } from '../../constants/tests';
import createIconBlock from '../../utils/createIconBlock';

class WalletAccouts {
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
      classList: [ClassMap.wallet.section, ClassMap.wallet.accountsSection, ClassMap.mode[this.modeValue].font],
    });
  }

  public render(): HTMLElement {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitle, ClassMap.mode[this.modeValue].title],
    });

    const title = createElement({
      tag: 'span',
      key: DictionaryKeys.accountsTitle,
      content: Dictionary[this.lang].accountsTitle,
    });

    const sum = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.sum],
    });

    sum.innerText = `${this.getAccoutsAmount()} ${CurrencyMark[this.currency]}`;

    header.append(title, sum);

    const accountsBlock = this.getAccoutsBlock();

    this.section?.replaceChildren(header, accountsBlock);

    return this.section as HTMLElement;
  }

  private getAccoutsAmount(): number {
    // const data = this.getAccouts();
    // const amount = data.reduce((accum, account) => accum + account.sum, 0);
    return 0;
  }

  public getAccouts(): IAccount[] {
    // БЭК получаем карты с балансами
    return Accounts;
  }

  private getAccoutsBlock(): HTMLElement {
    const accountsBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.itemContainer],
    });

    const data = this.getAccouts();
    const accounts = data.map(((itemAccount) => createIconBlock(itemAccount, SectionWallet.account)));

    const plusContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item],
    });

    const plusAccount = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.image],
    });

    plusContainer.append(plusAccount);

    plusAccount.innerHTML = SvgIcons.account.plus;

    accountsBlock.replaceChildren(...accounts, plusContainer);

    plusAccount.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorAccount(this.getAccouts, this.updateAccountsBlock).render();
      section?.append(modal as HTMLElement);
    });

    return accountsBlock;
  }
}

export default WalletAccouts;
