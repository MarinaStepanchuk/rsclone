import './CreatorAccount.scss';

import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { CURRENCY, LANG, MODE } from '../../types/types';
import { IAccount } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import AppState from '../../constants/appState';
import { SvgIcons } from '../../constants/svgMap';
import { Currency } from '../../types/enums';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';
// eslint-disable-next-line import/no-cycle
import { Accounts } from '../../components/WalletAccouts/WalletAccouts';

const defaultBalance = '0';

class CreatorAccount {
  public modalWrapper: HTMLElement | null = null;

  private form: HTMLFormElement | null = null;

  private submit: HTMLButtonElement | null = null;

  private modeValue: MODE;

  private lang: LANG;

  private inputName: HTMLInputElement | null = null;

  private icon: HTMLElement | null = null;

  private inputBalance: HTMLInputElement | null = null;

  private currency: CURRENCY;

  constructor(private getAccount: () => IAccount[], private updateAccountsBlock: () => void) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    this.init();
    this.addListeners();
  }

  private init(): void {
    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.wallet.account.createForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createWrapper],
    });

    this.inputName = createElement({
      tag: 'input',
      classList: [ClassMap.wallet.account.createName],
    }) as HTMLInputElement;
    this.inputName.type = 'text';

    this.icon = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createIcon],
    });
    this.icon.innerHTML = SvgIcons.account.base;

    this.inputBalance = createElement({
      tag: 'input',
      classList: [ClassMap.wallet.account.createBalance],
    }) as HTMLInputElement;
    this.inputBalance.type = 'number';
    this.inputBalance.value = defaultBalance;

    this.submit = createElement({
      tag: 'button',
      classList: [ClassMap.wallet.account.createSubmit],
      key: DictionaryKeys.createAccountSubmit,
      content: Dictionary[this.lang].createAccountSubmit,
    }) as HTMLButtonElement;
    this.submit.disabled = true;
  }

  public render(): HTMLElement {
    const formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.wallet.account.createTitle, ClassMap.mode[this.modeValue].modalTitle],
      key: DictionaryKeys.createAccountTitle,
      content: Dictionary[this.lang].createAccountTitle,
    });

    const itemName = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createItem],
    });

    const itemNameTitle = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].modalFont],
      key: DictionaryKeys.createAccountName,
      content: Dictionary[this.lang].createAccountName,
    });

    const containerInputName = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createInputContainer, ClassMap.parentInput],
    });

    containerInputName.append(itemNameTitle, this.inputName as HTMLInputElement);

    itemName.append(this.icon as HTMLElement, containerInputName);

    const itemBalance = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createItem],
    });

    const containerInputBalance = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createInputContainer],
    });

    const itemBalanceTitle = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].modalFont],
      key: DictionaryKeys.createAccountBalance,
      content: Dictionary[this.lang].createAccountBalance,
    });

    containerInputBalance.append(itemBalanceTitle, this.inputBalance as HTMLInputElement);

    const iconCurrency = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.account.createCurrency],
      content: `${Currency[this.currency]}`,
    });

    itemBalance.append(iconCurrency, containerInputBalance);

    const closeButton = createElement({
      tag: 'div',
      classList: [ClassMap.closeModalButton],
    });
    const firstLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].background],
    });
    const secondLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].background],
    });
    closeButton.append(firstLine, secondLine);

    this.form?.append(
      formTitle,
      itemName,
      itemBalance,
      this.submit as HTMLButtonElement,
      closeButton,
    );

    this.modalWrapper?.append(this.form as HTMLFormElement);

    return this.modalWrapper as HTMLElement;
  }

  private addListeners(): void {
    this.modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.wallet.account.createWrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.modalWrapper?.remove();
      }
    });

    this.inputName?.addEventListener('input', () => {
      const { value } = this.inputName as HTMLInputElement;

      if (value.length > 0) {
        (this.submit as HTMLButtonElement).disabled = false;
      } else {
        (this.submit as HTMLButtonElement).disabled = true;
      }

      const accounts = this.getAccount();

      accounts.forEach((item) => {
        if (item.account === value) {
          (this.submit as HTMLButtonElement).disabled = true;
          showErrorValidationMessage(this.inputName as HTMLInputElement, Dictionary[this.lang].errorMessageAccountExists);
        } else {
          (this.submit as HTMLButtonElement).disabled = false;
          removeErrorValidationMessage(this.inputName as HTMLInputElement);
        }
      });
    });

    this.form?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.wallet.account.createSubmit)
        && (this.submit as HTMLButtonElement).disabled === false
      ) {
        event.preventDefault();

        const data: IAccount = {
          account: (this.inputName as HTMLInputElement).value,
          sum: Number((this.inputBalance as HTMLInputElement).value),
          icon: (this.icon as HTMLElement).getElementsByTagName('svg')[0].id
        };

        this.addAccountToDatabase(data);

        this.updateAccountsBlock();

        this.modalWrapper?.remove();
      }
    });
  }

  private addAccountToDatabase(data: IAccount): void {
    // тестово
    console.log(data);
    Accounts.push(data);
    // добавляем в базу новый счет
  }
}

export default CreatorAccount;
