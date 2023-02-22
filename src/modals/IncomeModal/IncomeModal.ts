import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import { updateBalances, updateIncomes } from '../../utils/updateSum';
import BaseModal from '../BaseModal/BaseModal';
import { IIncome } from '../../types/interfaces';

class IncomeModal extends BaseModal {
  public render(totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement): HTMLElement {
    const formTitle = this.createFormTitle(DictionaryKeys.formIncomeTitle, Dictionary[this.lang].formIncomeTitle);
    const accountWrap = this.createAccountWrap();
    const sumWrap = this.createSumWrap();
    const dateWrap = this.createDateWrap();
    const commentWrap = this.createCommentWrap();

    const submitButton = this.createFormSubmitButton(DictionaryKeys.addIncomeButton, Dictionary[this.lang].addIncomeButton);

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const currAccountElem = document.querySelector('#accountSelect') as HTMLSelectElement;
      const currAccount = currAccountElem.value;

      const currDateElem = document.querySelector('#dateValue') as HTMLInputElement;
      const currDate = currDateElem.value ? new Date(currDateElem.value) : new Date();

      const sumInput = document.querySelector('#sumInput') as HTMLInputElement;
      const income = Number(sumInput.value);

      const commentElem = document.querySelector('#comment') as HTMLTextAreaElement;
      const comment = commentElem.value;

      const newIncome: IIncome = {
        date: currDate,
        account: currAccount,
        income,
        currency: this.currency,
        comment,
      };

      this.submitExpenseForm(e, newIncome, totalBalance, cardBalance, cashBalance);
    });

    const closeFormButton = this.createCloseButton();

    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.dashboard.incomeForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

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

    return this.modalWrapper;
  }

  private async createNewIncome(income: IIncome): Promise<IIncome | null> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newIncome: IIncome | null = await RequestApi.create(Endpoint.INCOME, userToken, income);
    return newIncome;
  }

  private async submitExpenseForm(e: MouseEvent, newIncome: IIncome, totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement)
  : Promise<void> {
    e.preventDefault();

    const incomeValue = await this.createNewIncome(newIncome);
    const accounts = await this.getAllAccounts();

    if (incomeValue) {
      const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
      const card = accounts.filter((account) => account.account === incomeValue.account).pop();
      const cardId = card?._id as string;

      const changedCardAccount: { updateSum: number } = {
        updateSum: incomeValue.income,
      };

      await RequestApi.updateSum(
        Endpoint.ACCOUNT,
        userToken,
        cardId,
        changedCardAccount
      );
    }

    updateIncomes(totalBalance);
    updateBalances(cardBalance, cashBalance);

    this.modalWrapper?.remove();
  }
}

export default IncomeModal;
