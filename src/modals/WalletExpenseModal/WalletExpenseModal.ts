import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { LocalStorageKey } from '../../constants/common';
import {
  IAccount, ICategory, IExpense,
} from '../../types/interfaces';
import {
  getComment,
  getDateValue,
  getSelectedValue,
  getSum,
} from '../../utils/getModalValue';
import BaseModal from '../BaseModal/BaseModal';

class WalletExpenseModal extends BaseModal {
  constructor(private category: ICategory, private updateCategoriesBlock: () => void, private updateAccountsBlock: () => void) {
    super();
  }

  public async render(): Promise<HTMLElement> {
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

    const accountWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem, ClassMap.parentInput],
    });

    const accountsAll = await this.getAccouts();

    accountsAll.forEach((account) => {
      const { key = '', account: name } = account;

      const optionItem = Dictionary[this.lang][key] && DictionaryKeys[key]
        ? createElement({
          tag: 'option',
          key: DictionaryKeys[key],
          content: Dictionary[this.lang][key],
          id: account._id,
        }) as HTMLOptionElement
        : createElement({
          tag: 'option',
          content: name,
          id: account._id,
        }) as HTMLOptionElement;

      optionItem.value = name;
      (accountSelect as HTMLSelectElement).append(optionItem);
    });

    accountWrap.append(accountLabel, accountSelect);

    const categoryLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelCategory,
      content: Dictionary[this.lang].labelCategory,
    }) as HTMLLabelElement;

    const categorySelect = createElement({
      tag: 'select',
      classList: [ClassMap.dashboard.formSelect],
      id: IdMap.accountSelect,
    }) as HTMLSelectElement;

    categorySelect.disabled = true;

    const categoryWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem, ClassMap.parentInput],
    });

    const { key = '', category: name } = this.category;
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
    categorySelect.append(optionItem);

    categoryWrap.append(categoryLabel, categorySelect);

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

    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const option = accountSelect.querySelector(`option[value="${accountSelect.value}"]`) as HTMLElement;

      const newExpense: IExpense = {
        date: getDateValue(),
        account: getSelectedValue(IdMap.accountSelect),
        category: this.category.category,
        expense: getSum(),
        currency: this.currency,
        comment: getComment(),
      };

      await this.createNewExpense(newExpense);

      await this.updateAccountSum(newExpense.expense, option.id);

      this.updateCategoriesBlock();

      this.updateAccountsBlock();

      this.modalWrapper?.remove();
    });

    return this.modalWrapper;
  }

  private async getAccouts(): Promise<IAccount[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
    return accountsData;
  }

  private async createNewExpense(expense: IExpense): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    await RequestApi.create(Endpoint.EXPENSE, userToken, expense);
  }

  private async updateAccountSum(sum: number, id: string): Promise<void> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    await RequestApi.updateSum(Endpoint.ACCOUNT, userToken, id, { updateSum: -sum });
  }
}

export default WalletExpenseModal;
