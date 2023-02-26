import './WalletAccouts.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IAccount } from '../../types/interfaces';
import CreatorAccount from '../../modals/CreatorAccount/CreatorAccount';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import UpdaterAccount from '../../modals/UpdaterAccount/UpdaterAccount';

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

  public async render(): Promise<HTMLElement> {
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

    const sumContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.subTitleItem],
    });

    sumContainer.append(title, sum);

    const amount = await this.getAccoutsAmount();

    sum.innerText = `${amount} ${CurrencyMark[this.currency]}`;

    header.append(sumContainer);

    const accountsBlock = await this.getAccoutsBlock();

    this.section?.replaceChildren(header, accountsBlock);

    return this.section as HTMLElement;
  }

  private async getAccoutsAmount(): Promise<number> {
    const data = await this.getAccouts();
    const amount = data.reduce((accum, account) => accum + account.sum, 0);
    return amount;
  }

  public async getAccouts(): Promise<IAccount[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
    return accountsData;
  }

  private async getAccoutsBlock(): Promise<HTMLElement> {
    const accountsBlock = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.itemContainer],
    });

    const data = await this.getAccouts();
    const accounts = data.map(((itemAccount) => this.createIconBlock(itemAccount)));

    const plusContainer = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.item],
    });

    const plusAccount = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.image, ClassMap.wallet.plus],
    });

    plusContainer.append(plusAccount);

    plusAccount.innerHTML = SvgIcons.account.plus;

    accountsBlock.replaceChildren(...accounts, plusContainer);

    plusAccount.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new CreatorAccount(this.getAccouts, this.updateAccountsBlock).render();
      section?.append(modal as HTMLElement);
    });

    accountsBlock.addEventListener('click', async (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.closest(`.${ClassMap.wallet.image}`) && !targetElement.classList.contains(`.${ClassMap.wallet.plus}`) && !targetElement.closest(`.${ClassMap.wallet.plus}`)) {
        const id = targetElement.closest(`.${ClassMap.wallet.item}`)?.id as string;
        const account = await this.getAccount(id);

        if (account) {
          const modal = new UpdaterAccount(account, this.updateAccountsBlock).render();
          const section = document.querySelector(`.${ClassMap.main}`);
          section?.append(modal as HTMLElement);
        }
      }
    });

    return accountsBlock;
  }

  private createIconBlock(data: IAccount): HTMLElement {
    const {
      _id: id, icon, sum, key = '', account: name,
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

    itemIcon.innerHTML = SvgIcons.account[icon] ? SvgIcons.account[icon] : SvgIcons.account.base;

    const itemAmount = createElement({
      tag: 'span',
      classList: [ClassMap.wallet.balance],
      content: `${sum} ${CurrencyMark[this.currency]}`,
    });

    item.replaceChildren(itemTitle, itemIcon, itemAmount);

    return item;
  }

  private async getAccount(id: string): Promise<IAccount | null> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const account: IAccount | null = await RequestApi.get(Endpoint.ACCOUNT, userToken, id);

    return account;
  }
}

export default WalletAccouts;
