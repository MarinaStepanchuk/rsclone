import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import { updateTotalAccountBalance, updateIncomes } from '../../utils/updateSum';
import BaseModal from '../BaseModal/BaseModal';
import { IBalances, IIncome } from '../../types/interfaces';
import { getAllAccounts } from '../../utils/getModalApi';
import {
  getComment,
  getDateValue,
  getSelectedValue,
  getSum,
} from '../../utils/getModalValue';
import IncomeList from '../../components/IncomeList/IncomeList';

class IncomeModal extends BaseModal {
  public render(incomeBalances: IBalances): HTMLElement {
    const formTitle = this.createFormTitle(DictionaryKeys.formIncomeTitle, Dictionary[this.lang].formIncomeTitle);
    const accountWrap = this.createAccountWrap();
    const sumWrap = this.createSumWrap();
    const dateWrap = this.createDateWrap();
    const commentWrap = this.createCommentWrap();

    const submitButton = this.createFormSubmitButton(DictionaryKeys.addIncomeButton, Dictionary[this.lang].addIncomeButton);

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const newIncome: IIncome = {
        date: getDateValue(),
        account: getSelectedValue(IdMap.accountSelect),
        income: getSum(),
        currency: this.currency,
        comment: getComment(),
      };

      this.submitExpenseForm(e, newIncome, incomeBalances);
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

  private async submitExpenseForm(e: MouseEvent, newIncome: IIncome, incomeBalances: IBalances): Promise<void> {
    e.preventDefault();

    const incomeValue = await this.createNewIncome(newIncome);
    const accounts = await getAllAccounts();

    if (incomeValue) {
      const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
      const card = accounts
        .filter((account) => account.account === incomeValue.account)
        .pop();
      const cardId = card?._id as string;

      const changedCardAccount: { updateSum: number } = {
        updateSum: incomeValue.income,
      };

      await RequestApi.updateSum(
        Endpoint.ACCOUNT,
        userToken,
        cardId,
        changedCardAccount,
      );
    }

    await updateIncomes(incomeBalances);
    await updateTotalAccountBalance(incomeBalances);
    await IncomeList.updateIncomeList();

    this.modalWrapper?.remove();
  }
}

export default IncomeModal;
