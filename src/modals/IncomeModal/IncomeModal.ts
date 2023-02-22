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

      const currAccountElem = document.getElementById('accountSelect') as HTMLSelectElement;
      const currAccount = currAccountElem.value;

      const currDateElem = document.getElementById('dateValue') as HTMLInputElement;
      const currDate = currDateElem.value ? new Date(currDateElem.value) : new Date();

      const sumInput = document.getElementById('sumInput') as HTMLInputElement;
      const income = Number(sumInput.value);

      const commentElem = document.getElementById('comment') as HTMLTextAreaElement;
      const comment = commentElem.value;

      const newIncome: IIncome = {
        date: currDate,
        account: currAccount,
        income,
        currency: this.currency,
        comment,
      };

      this.submitForm(e, newIncome, totalBalance, cardBalance, cashBalance);
    //   e.preventDefault();
    //
    //   const currAccount = categorySelect.value;
    //   const currDate = dataInput.value ? new Date(dataInput.value) : new Date();
    //   const income = Number(sumInput.value);
    //   const comment = noteText.value;
    //
    //   const newIncome: IIncome = {
    //     date: currDate,
    //     account: currAccount,
    //     income,
    //     currency: this.currency,
    //     comment,
    //   };
    //
    //   const incomeRes = this.createNewIncome(newIncome);
    //
    //   incomeRes.then((incomeValue) => {
    //     incomeValue.account
    //
    //     // const prevSum = totalBalance.textContent;
    //     // const newSum = Number(prevSum) + incomeValue.income;
    //     //
    //     // totalBalance.textContent = `${newSum}`;
    //
    //     // updateIncomes(totalBalance, cardBalance, cashBalance);
    //     updateIncomes(totalBalance);
    //     updateBalances(cardBalance, cashBalance)
    //     this.modalWrapper?.remove();
    //   });
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

  private async createNewIncome(income: IIncome): Promise<IIncome> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newIncome: IIncome = await RequestApi.create(Endpoint.INCOME, userToken, income);
    return newIncome;
  }

  private async updateSum() {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    if (incomeValue.account === 'card') {
      const fakeId = '63f37060d3206af9d4c9584b';
      const changedCardAccount: { updateSum: number } = {
        updateSum: 50, // + Прибавить, - отнять
      };

      const changedAccountSum: { updateSum: number } | null = await RequestApi.updateSum(
        Endpoint.ACCOUNT,
        userToken,
        fakeId,
        changedCardAccount
      );
      console.log(changedAccountSum);
    }
  }

  private submitForm(e: MouseEvent, newIncome: IIncome, totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement) {
    e.preventDefault();

    const incomeRes = this.createNewIncome(newIncome);

    incomeRes.then((incomeValue) => {


      //! Обновление суммы счета
      // id Пришлось прописывать отдельно, при использовании дженерика не смог придумать иной выход, поэтому и в функции 4 параметра
      // const fakeId = '63f37060d3206af9d4c9584b';
      // const fakeСhangedAccount: { updateSum: number } = {
      //   updateSum: 50, // + Прибавить, - отнять
      // };
      // const changedAccountSum: { updateSum: number } | null = await RequestApi.updateSum(Endpoint.ACCOUNT, userToken, fakeId, fakeСhangedAccount);
      // console.log(changedAccountSum);

      // const prevSum = totalBalance.textContent;
      // const newSum = Number(prevSum) + incomeValue.income;
      //
      // totalBalance.textContent = `${newSum}`;

      updateIncomes(totalBalance);
      updateBalances(cardBalance, cashBalance);

      this.modalWrapper?.remove();
    });
  }
}

export default IncomeModal;
