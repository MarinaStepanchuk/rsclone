import { ClassMap } from '../../constants/htmlConstants';
import BaseModal from '../BaseModal/BaseModal';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import createElement from '../../utils/createElement';
import { IExpense } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import { updateBalances, updateExpenses } from '../../utils/updateSum';

class ExpenseModal extends BaseModal {
  public render(totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement): HTMLElement {
    const formTitle = this.createFormTitle(DictionaryKeys.formExpenseTitle, Dictionary[this.lang].formExpenseTitle);
    const accountWrap = this.createAccountWrap();
    const categoryWrap = this.createCategoriesWrap();
    const sumWrap = this.createSumWrap();
    const dateWrap = this.createDateWrap();
    const commentWrap = this.createCommentWrap();
    const submitButton = this.createFormSubmitButton(DictionaryKeys.addExpenseButton, Dictionary[this.lang].addExpenseButton);

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const currAccountElem = document.getElementById('accountSelect') as HTMLSelectElement;
      const currAccount = currAccountElem.value;

      const currCategoryElem = document.getElementById('categorySelect') as HTMLSelectElement;
      const currCategory = currCategoryElem.value;

      const currDateElem = document.getElementById('dateValue') as HTMLInputElement;
      const currDate = currDateElem.value ? new Date(currDateElem.value) : new Date();

      const sumInput = document.getElementById('sumInput') as HTMLInputElement;
      const expense = Number(sumInput.value);

      const commentElem = document.getElementById('comment') as HTMLTextAreaElement;
      const comment = commentElem.value;

      const newExpense: IExpense = {
        date: currDate,
        account: currAccount,
        category: currCategory,
        expense,
        currency: this.currency,
        comment,
      };

      this.submitForm(e, newExpense, totalBalance, cardBalance, cashBalance);
    });

    const closeFormButton = this.createCloseButton();

    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.dashboard.incomeForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.form.append(
      formTitle,
      accountWrap,
      categoryWrap,
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

  private async createNewExpense(expense: IExpense): Promise<IExpense> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newExpense: IExpense = await RequestApi.create(Endpoint.EXPENSE, userToken, expense);

    // const updateSumResponse =
    return newExpense;
  }

  private submitForm(e: MouseEvent, newExpense: IExpense, totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement) {
    e.preventDefault();

    const expenseRes = this.createNewExpense(newExpense);

    expenseRes.then((expenseValue) => {
      expenseValue.account;

      // const prevSum = totalBalance.textContent;
      // const newSum = Number(prevSum) + incomeValue.income;
      //
      // totalBalance.textContent = `${newSum}`;

      updateExpenses(totalBalance);
      updateBalances(cardBalance, cashBalance);

      this.modalWrapper?.remove();
    });
  }
}

export default ExpenseModal;
