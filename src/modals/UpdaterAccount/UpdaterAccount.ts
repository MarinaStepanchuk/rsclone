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
import createElement from '../../utils/createElement';
import WalletIncomeModal from '../WalletIncomeModal/WalletIncomeModal';
import SvgModal from '../SvgModal/SvgModal';

class UpdaterAccount extends BaseCreater {
  constructor(private account: IAccount, private updateAccountsBlock: () => void) {
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
    submit.innerText = Dictionary[this.lang].updateAccountSubmit;
    submit.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    submit.setAttribute(Attribute.key, DictionaryKeys.updateAccountSubmit);

    const formTitle = this.formTitle as HTMLElement;
    formTitle.innerText = Dictionary[this.lang].updateAccountTitle;
    formTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    formTitle.setAttribute(Attribute.key, DictionaryKeys.updateAccountTitle);

    const itemNameTitle = this.itemNameTitle as HTMLElement;
    itemNameTitle.innerText = Dictionary[this.lang].createAccountName;
    itemNameTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemNameTitle.setAttribute(Attribute.key, DictionaryKeys.createAccountName);

    (this.inputName as HTMLInputElement).value = this.account.account;
    (this.icon as HTMLElement).innerHTML = SvgIcons.account[this.account.icon];

    this.itemBalance?.remove();

    const deleteButton = createElement({
      tag: 'button',
      classList: [ClassMap.updater.deleteButton],
      key: DictionaryKeys.deleteAccountButton,
      content: Dictionary[this.lang].deleteAccountButton,
    }) as HTMLButtonElement;

    const createIncome = createElement({
      tag: 'button',
      classList: [ClassMap.updater.createButton],
      key: DictionaryKeys.createIncomeButton,
      content: Dictionary[this.lang].createIncomeButton,
    }) as HTMLButtonElement;

    submit.before(createIncome, deleteButton);

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

      const accounts = await this.getAccounts();
      let matchFound = false;

      accounts.forEach((item) => {
        if (item.account === value && value !== this.account.account) {
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

        const data: IAccount = this.account.key && this.account.account === (this.inputName as HTMLInputElement).value ? {
          account: (this.inputName as HTMLInputElement).value,
          sum: this.account.sum,
          icon: idIcon,
        } : {
          account: (this.inputName as HTMLInputElement).value,
          sum: this.account.sum,
          icon: idIcon,
          key: '',
        };

        await this.updateAccountToDatabase(data);

        this.updateAccountsBlock();

        this.modalWrapper?.remove();
      }

      if (targetElement.classList.contains(ClassMap.updater.deleteButton)
      ) {
        await this.deleteAccount();

        this.updateAccountsBlock();

        this.modalWrapper?.remove();
      }

      if (targetElement.classList.contains(ClassMap.updater.createButton)
      ) {
        event.preventDefault();

        const section = document.querySelector(`.${ClassMap.mainContent}`);
        section?.append(new WalletIncomeModal(this.account, this.updateAccountsBlock).render());
      }

      if (targetElement.closest(`.${ClassMap.creater.createIcon}`)) {
        const section = document.querySelector(`.${ClassMap.mainContent}`);
        section?.append(new SvgModal(SvgIcons.account).render());
      }
    });
  }

  private async updateAccountToDatabase(data: IAccount): Promise<IAccount | null> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const { _id: id } = this.account;
    const changedAccount: IAccount | null = await RequestApi.update(Endpoint.ACCOUNT, userToken, id as string, data);

    return changedAccount || null;
  }

  private async getAccounts(): Promise<IAccount[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
    return accountsData;
  }

  private async deleteAccount(): Promise<void> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const { _id: id } = this.account;
    await RequestApi.delete(Endpoint.ACCOUNT, userToken, id as string);
  }
}

export default UpdaterAccount;
