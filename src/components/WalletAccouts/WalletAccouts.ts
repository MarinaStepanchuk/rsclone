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

const Accounts = [
  {
    name: 'Cash',
    icon: 'cash',
    sum: 4650,
  },
  {
    name: 'Card',
    icon: 'card',
    sum: 2380,
  },
];

class WalletAccouts {
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

  private getAccouts() {
    // БЭК получаем карты с балансами
    return Accounts;
  }

  private getAccoutsBlock(): HTMLElement {
    const accountsBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.container],
    });

    const data = this.getAccouts();
    const accounts = data.map(((account) => this.createAccountItem(account)));

    const plusAccount = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.icon],
    });

    plusAccount.innerHTML = SvgIcons.account.plus;

    accountsBlock.replaceChildren(...accounts, plusAccount);

    return accountsBlock;
  }

  private createAccountItem(account: IAccount): HTMLElement {
    const { name, icon, sum } = account;

    const item = createElement({
      tag: 'div',
      classList: [ClassMap.iconBlock.item],
      id: `account-${name}`,
    });

    const itemTitle = Dictionary[this.lang][name] && DictionaryKeys[name]
      ? createElement({
        tag: 'span',
        classList: [ClassMap.wallet.account.title],
        key: DictionaryKeys[account.name],
        content: Dictionary[this.lang][account.name],
      })
      : createElement({
        tag: 'span',
        classList: [ClassMap.wallet.account.title],
        content: name,
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

  public updateComponent() {
    this.render();
  }
}

export default WalletAccouts;
