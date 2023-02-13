import './WalletAccouts.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Currency } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IAccount } from '../../types/interfaces';
import CreatorAccount from '../../modals/CreatorAccount/CreatorAccount';
import { Accounts } from '../../constants/tests';

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
      classList: [...ClassMap.wallet.account.wrapper, ClassMap.mode[this.modeValue].font],
    });
  }

  public render(): HTMLElement {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.header, ClassMap.mode[this.modeValue].title],
    });

    const title = createElement({
      tag: 'span',
      key: DictionaryKeys.accountsTitle,
      content: Dictionary[this.lang].accountsTitle,
    });

    const sum = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.account.sum],
    });

    sum.innerText = `${this.getAccoutsAmount()} ${Currency[this.currency]}`;

    header.append(title, sum);

    const accountsBlock = this.getAccoutsBlock();

    this.section?.replaceChildren(header, accountsBlock);

    return this.section as HTMLElement;
  }

  private getAccoutsAmount(): number {
    const data = this.getAccouts();
    const amount = data.reduce((accum, account) => accum + account.sum, 0);
    return amount;
  }

  public getAccouts(): IAccount[] {
    // БЭК получаем карты с балансами
    return Accounts;
  }

  private getAccoutsBlock(): HTMLElement {
    const accountsBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.container],
    });

    const data = this.getAccouts();
    const accounts = data.map(((itemAccount) => this.createAccountItem(itemAccount)));

    const plusAccount = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.icon],
    });

    plusAccount.innerHTML = SvgIcons.account.plus;

    accountsBlock.replaceChildren(...accounts, plusAccount);

    plusAccount.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorAccount(this.getAccouts, this.updateAccountsBlock).render();
      section?.append(modal as HTMLElement);
    });

    return accountsBlock;
  }

  private createAccountItem(itemAccount: IAccount): HTMLElement {
    const {
      _id: id, account, icon, sum,
    } = itemAccount;

    const item = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.item],
      id: id as string,
    });

    const itemTitle = Dictionary[this.lang][account] && DictionaryKeys[account]
      ? createElement({
        tag: 'span',
        classList: [ClassMap.wallet.account.title],
        key: DictionaryKeys[account],
        content: Dictionary[this.lang][account],
      })
      : createElement({
        tag: 'span',
        classList: [ClassMap.wallet.account.title],
        content: account,
      });

    const itemIcon = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.icon, ClassMap.iconBlock.icon],
    });

    itemIcon.innerHTML = SvgIcons.account[icon] ? SvgIcons.account[icon] : SvgIcons.account.base;

    const itemAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.account.balance],
      content: `${sum} ${Currency[this.currency]}`,
    });

    item.replaceChildren(itemTitle, itemIcon, itemAmount);

    return item;
  }
}

export default WalletAccouts;
