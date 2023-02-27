import { ClassMap, IdMap } from '../../constants/htmlConstants';
import BaseModal from '../BaseModal/BaseModal';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import createElement from '../../utils/createElement';
import { IBalances, IExpense } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import { updateTotalAccountBalance, updateExpenses } from '../../utils/updateSum';
import { getAllAccounts } from '../../utils/getModalApi';
import {
  getComment,
  getDateValue,
  getSelectedValue,
  getSum,
} from '../../utils/getModalValue';
import ExpenseList from '../../components/ExpenseList/ExpenseList';

class ExpenseModal extends BaseModal {
  public render(expenseBalances: IBalances): HTMLElement {
    const formTitle = this.createFormTitle(DictionaryKeys.formExpenseTitle, Dictionary[this.lang].formExpenseTitle);
    const accountWrap = this.createAccountWrap();
    const categoryWrap = this.createCategoriesWrap();
    const sumWrap = this.createSumWrap();
    const dateWrap = this.createDateWrap();
    const commentWrap = this.createCommentWrap();
    const submitButton = this.createFormSubmitButton(DictionaryKeys.addExpenseButton, Dictionary[this.lang].addExpenseButton);

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const newExpense: IExpense = {
        date: getDateValue(),
        account: getSelectedValue(IdMap.accountSelect),
        category: getSelectedValue(IdMap.categorySelect),
        expense: getSum(),
        currency: this.currency,
        comment: getComment(),
      };

      this.submitForm(e, newExpense, expenseBalances);
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

  private async createNewExpense(expense: IExpense): Promise<IExpense | null> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newExpense: IExpense | null = await RequestApi.create(Endpoint.EXPENSE, userToken, expense);

    return newExpense;
  }

  private async submitForm(e: MouseEvent, newExpense: IExpense, expenseBalances: IBalances) {
    e.preventDefault();

    const expenseValue = await this.createNewExpense(newExpense);
    const accounts = await getAllAccounts();

    if (expenseValue) {
      const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
      const card = accounts.filter((account) => account.account === expenseValue.account).pop();
      const cardId = card?._id as string;

      const changedCardAccount: { updateSum: number } = {
        updateSum: -expenseValue.expense,
      };

      await RequestApi.updateSum(
        Endpoint.ACCOUNT,
        userToken,
        cardId,
        changedCardAccount,
      );
    }

    await updateExpenses(expenseBalances);
    await updateTotalAccountBalance(expenseBalances);
    await ExpenseList.updateExpenseList();

    this.modalWrapper?.remove();
  }
}

export default ExpenseModal;
