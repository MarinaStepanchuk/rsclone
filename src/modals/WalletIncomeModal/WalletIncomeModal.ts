import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import { IAccount, IIncome } from '../../types/interfaces';
import {
  getComment,
  getDateValue,
  getSelectedValue,
  getSum,
} from '../../utils/getModalValue';
import BaseModal from '../BaseModal/BaseModal';

class WalletIncomeModal extends BaseModal {
  constructor(private account: IAccount, private updateAccountsBlock: () => void) {
    super();
  }

  public render(): HTMLElement {
    const formTitle = this.createFormTitle(DictionaryKeys.formIncomeTitle, Dictionary[this.lang].formIncomeTitle);
    const sumWrap = this.createSumWrap();
    const dateWrap = this.createDateWrap();
    const commentWrap = this.createCommentWrap();

    const submitButton = this.createFormSubmitButton(DictionaryKeys.addIncomeButton, Dictionary[this.lang].addIncomeButton);

    const closeFormButton = this.createCloseButton();

    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.dashboard.incomeForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    const accountLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelCategory,
      content: Dictionary[this.lang].labelCategory,
    }) as HTMLLabelElement;

    const accountSelect = createElement({
      tag: 'select',
      classList: [ClassMap.dashboard.formSelect],
      id: IdMap.accountSelect,
    }) as HTMLSelectElement;

    accountSelect.disabled = true;

    const accountWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem, ClassMap.parentInput],
    });

    const { key = '', account: name } = this.account;
    const optionItem = Dictionary[this.lang][key] && DictionaryKeys[key]
      ? createElement({
        tag: 'option',
        key: DictionaryKeys[key],
        content: Dictionary[this.lang][key],
      }) as HTMLOptionElement
      : createElement({
        tag: 'option',
        content: name,
      }) as HTMLOptionElement;

    optionItem.value = name;
    accountSelect.append(optionItem);

    accountWrap.append(accountLabel, accountSelect);

    this.form.append(
      formTitle,
      accountWrap,
      sumWrap,
      dateWrap,
      commentWrap,
      submitButton,
      closeFormButton,
    );

    this.modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formWrapper],
    });

    this.modalWrapper.append(this.form);

    this.addListeners();

    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const newIncome: IIncome = {
        date: getDateValue(),
        account: getSelectedValue(IdMap.accountSelect),
        income: getSum(),
        currency: this.currency,
        comment: getComment(),
      };

      await this.createNewIncome(newIncome);

      await this.updateAccountSum(newIncome.income);

      this.updateAccountsBlock();

      this.modalWrapper?.remove();
    });

    return this.modalWrapper;
  }

  private async createNewIncome(income: IIncome): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    await RequestApi.create(Endpoint.INCOME, userToken, income);
  }

  private async updateAccountSum(sum: number): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    await RequestApi.updateSum(Endpoint.ACCOUNT, userToken, this.account._id as string, { updateSum: sum });
  }
}

export default WalletIncomeModal;
