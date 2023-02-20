import './IncomeModal.scss';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import createElement from '../../utils/createElement';
import {
  ClassMap,
  InputType,
  InputValue,
  MinDate,
  TextArea,
} from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IAccount, IIncome } from '../../types/interfaces';
import updateIncomes from '../../utils/updateIncomes';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark } from '../../types/enums';

class IncomeModal {
  private modeValue: MODE;

  private readonly lang: LANG;

  private readonly currency: CURRENCY;

  public modalWrapper: HTMLElement | null = null;

  private form: HTMLFormElement | null = null;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public render(totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement): HTMLElement {
    const formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.dashboard.formTitle, ClassMap.mode[this.modeValue].modalTitle],
      key: DictionaryKeys.formIncomeTitle,
      content: Dictionary[this.lang].formIncomeTitle,
    });

    const categoryLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelCategory,
      content: Dictionary[this.lang].labelCategory,
    }) as HTMLLabelElement;

    const categorySelect = createElement({
      tag: 'select',
      classList: [ClassMap.dashboard.formSelect],
    }) as HTMLSelectElement;

    const categoryWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem, ClassMap.parentInput],
    });

    const categoriesAll = this.getAllCategories();

    categoriesAll.then((categories) => {
      categories.forEach((category) => {
        (categorySelect as HTMLSelectElement).append(this.createOptionCurrency(!category.key ? '' : category.key));
      });
    });

    categoryWrap.append(categoryLabel, categorySelect);

    const sumLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelSum,
      content: Dictionary[this.lang].labelSum,
    }) as HTMLLabelElement;

    const currencyValue = createElement({
      tag: 'span',
      content: `${CurrencyMark[this.currency]}`,
    });

    sumLabel.append(currencyValue);

    const sumInput = createElement({
      tag: 'input',
      classList: [ClassMap.dashboard.formInput],
    }) as HTMLInputElement;

    sumInput.type = InputType.number;
    sumInput.min = InputValue.minNum;
    sumInput.max = InputValue.maxNum;
    sumInput.required = true;

    sumInput.addEventListener('change', () => {
      const currSum = Number(sumInput.value);

      if (!Number.isInteger(currSum)) {
        sumInput.value = currSum.toFixed(2);
      }

      sumInput.value = currSum.toString();
    });

    const sumWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    sumWrap.append(sumLabel, sumInput);

    const dataLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelDate,
      content: Dictionary[this.lang].labelDate,
    }) as HTMLLabelElement;

    const dataInput = createElement({
      tag: 'input',
      classList: [ClassMap.dashboard.formInput],
    }) as HTMLInputElement;

    dataInput.type = InputType.date;
    dataInput.min = MinDate;

    const todayDate = new Date();

    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();

    const todayFullDate = `${year}-${month.toString().padStart(2, '0')}-${day}`;

    dataInput.value = todayFullDate;

    dataInput.addEventListener('change', () => {
      const userDate = new Date(dataInput.value);
      // const minDate = new Date(MinDate);

      // if (minDate.getTime() > userDate.getTime()) {
      //     dataInput.value = MinDate;
      //   }

      if (userDate.getTime() > todayDate.getTime()) {
        dataInput.value = todayFullDate;
      }
    });

    const dataWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    dataWrap.append(dataLabel, dataInput);

    const noteLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelNote,
      content: Dictionary[this.lang].labelNote,
    }) as HTMLLabelElement;

    const noteText = createElement({
      tag: 'textarea',
      classList: [ClassMap.dashboard.formInput, ClassMap.dashboard.formTextarea],
    }) as HTMLTextAreaElement;

    noteText.rows = TextArea.rows;
    noteText.minLength = TextArea.minLength;
    noteText.maxLength = TextArea.maxLength;

    const noteWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    noteWrap.append(noteLabel, noteText);

    const submitButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.formSubmitButton],
      key: DictionaryKeys.addIncomeButton,
      content: Dictionary[this.lang].addIncomeButton,
    }) as HTMLButtonElement;

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const currAccount = categorySelect.value;
      const currDate = dataInput.value ? new Date(dataInput.value) : new Date();
      const income = Number(sumInput.value);
      const comment = noteText.value;

      const newIncome: IIncome = {
        date: currDate,
        account: currAccount,
        income,
        currency: this.currency,
        comment,
      };

      const incomeRes = this.createNewIncome(newIncome);

      incomeRes.then((incomeValue) => {
        const totalIncomeWrap = document.getElementById('incomeBalance');

        if (totalIncomeWrap) {
          const prevSum = totalIncomeWrap.textContent;
          const newSum = Number(prevSum) + incomeValue.income;

          totalIncomeWrap.textContent = `${newSum}`;
        }

        updateIncomes(totalBalance, cardBalance, cashBalance);
        this.modalWrapper?.remove();
      });
    });

    const closeFormButton = createElement({
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

    closeFormButton.append(firstLine, secondLine);

    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.dashboard.incomeForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.form.append(
      formTitle,
      categoryWrap,
      sumWrap,
      dataWrap,
      noteWrap,
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

  private createOptionCurrency(category: string): HTMLOptionElement {
    const optionCurrency = createElement({
      tag: 'option',
      content: Dictionary[this.lang][category],
    }) as HTMLOptionElement;

    optionCurrency.value = category;

    return optionCurrency;
  }

  private addListeners(): void {
    this.modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.dashboard.formWrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.modalWrapper?.remove();
      }
    });
  }

  private async getAllCategories(): Promise<IAccount[]> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
    return accountsData;
  }

  private async createNewIncome(income: IIncome): Promise<IIncome> {
    const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const newIncome: IIncome = await RequestApi.create(Endpoint.INCOME, userToken, income);
    return newIncome;
  }
}

export default IncomeModal;
