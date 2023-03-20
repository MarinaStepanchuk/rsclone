import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IAccount } from '../../types/interfaces';
import { LANG_ATTRIBUTE, LocalStorageKey } from '../../constants/common';
import AppState from '../../constants/appState';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';
import BaseCreater from '../BaseCreater/BaseCreater';
import { SvgIcons } from '../../constants/svgMap';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import SvgModal from '../SvgModal/SvgModal';

class CreatorAccount extends BaseCreater {
  constructor(private getAccount: () => Promise<IAccount[]>, private updateAccountsBlock: () => void) {
    super();
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    super.init();
    super.fill();
    this.addListeners();
  }

  public render(): HTMLElement {
    const submit = this.submit as HTMLButtonElement;
    submit.innerText = Dictionary[this.lang].createAccountSubmit;
    submit.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    submit.setAttribute(Attribute.key, DictionaryKeys.createAccountSubmit);

    const formTitle = this.formTitle as HTMLElement;
    formTitle.innerText = Dictionary[this.lang].createAccountTitle;
    formTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    formTitle.setAttribute(Attribute.key, DictionaryKeys.createAccountTitle);

    const itemNameTitle = this.itemNameTitle as HTMLElement;
    itemNameTitle.innerText = Dictionary[this.lang].createAccountName;
    itemNameTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemNameTitle.setAttribute(Attribute.key, DictionaryKeys.createAccountName);

    const itemBalanceTitle = this.itemBalanceTitle as HTMLElement;
    itemBalanceTitle.innerText = Dictionary[this.lang].createAccountBalance;
    itemBalanceTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemBalanceTitle.setAttribute(Attribute.key, DictionaryKeys.createAccountBalance);

    (this.icon as HTMLElement).innerHTML = SvgIcons.account.base;

    return this.modalWrapper as HTMLElement;
  }

  private addListeners(): void {
    this.inputName?.addEventListener('input', async () => {
      const { value } = this.inputName as HTMLInputElement;

      if (value.length > 0) {
        (this.submit as HTMLButtonElement).disabled = false;
      } else {
        (this.submit as HTMLButtonElement).disabled = true;
      }

      const accounts = await this.getAccount();
      let matchFound = false;

      accounts.forEach((item) => {
        if (item.account === value) {
          matchFound = true;
        }
      });

      if (matchFound) {
        (this.submit as HTMLButtonElement).disabled = true;
        showErrorValidationMessage(this.inputName as HTMLInputElement, Dictionary[this.lang].errorMessageAccountExists);
      } else {
        (this.submit as HTMLButtonElement).disabled = false;
        removeErrorValidationMessage(this.inputName as HTMLInputElement);
      }

      if (value === '') {
        (this.submit as HTMLButtonElement).disabled = true;
      }
    });

    this.form?.addEventListener('click', async (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.creater.createSubmit)
        && (this.submit as HTMLButtonElement).disabled === false
      ) {
        event.preventDefault();

        const idIcon = (this.icon as HTMLElement).getElementsByTagName('svg')[0].id.split('-')[1];

        const data: IAccount = {
          account: (this.inputName as HTMLInputElement).value,
          sum: Number((this.inputBalance as HTMLInputElement).value) || 0,
          icon: idIcon,
        };

        await this.addAccountToDatabase(data);

        this.updateAccountsBlock();

        this.modalWrapper?.remove();
      }

      if (targetElement.closest(`.${ClassMap.creater.createIcon}`)) {
        const section = document.querySelector(`.${ClassMap.mainContent}`);
        section?.append(new SvgModal(SvgIcons.account).render());
      }
    });
  }

  private async addAccountToDatabase(data: IAccount): Promise<IAccount | null> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newAccount: IAccount | null = await RequestApi.create(Endpoint.ACCOUNT, userToken, data);

    return newAccount || null;
  }
}

export default CreatorAccount;
