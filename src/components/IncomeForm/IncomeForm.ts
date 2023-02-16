import './IncomeForm.scss';
import {LANG, MODE} from '../../types/types';
import AppState from '../../constants/appState';
import createElement from '../../utils/createElement';
import {ClassMap, InputType, InputValue, MinDate, TextArea} from '../../constants/htmlConstants';
import {Dictionary, DictionaryKeys} from '../../constants/dictionary';
import RequestApi from "../../Api/RequestsApi";
import {Endpoint} from "../../Api/serverConstants";
import {LocalStorageKey} from "../../constants/common";

class IncomeForm {
  private modeValue: MODE;

  private lang: LANG;

  public modalWrapper: HTMLElement | null = null;

  private form: HTMLFormElement | null = null;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(): HTMLElement {
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

    const categories = this.getAllCategories();
    console.log(categories);

    // const userAccount = localStorage.getItem(LocalStorageKey.auth);
    // let token;
    //
    // if (userAccount) {
    //   const userAccountObj = JSON.parse(userAccount);
    //   token = userAccountObj.token;
    // }
    //
    // await RequestApi.getAll(Endpoint.CATEGORY, token);

    // Currency.forEach((currency) => (categorySelect as HTMLSelectElement).append(this.createOptionCurrency(currency)));

    categoryWrap.append(categoryLabel, categorySelect);

    const sumLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelSum,
      content: Dictionary[this.lang].labelSum,
    }) as HTMLLabelElement;

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
        sumInput.value = currSum.toFixed(2).toString();
      } else {
        sumInput.value = currSum.toString();
      }
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

    dataInput.addEventListener('change', () => {
      const currDate = new Date();
      const userDate = new Date(dataInput.value);
      const minDate = new Date(MinDate);

      const year = currDate.getFullYear();
      const month = currDate.getMonth() + 1;
      const day = currDate.getDate();

      const currFullDate = `${year}-${month.toString().padStart(2, '0')}-${day}`;

      if (userDate.getTime() > currDate.getTime()) {
        dataInput.value = currFullDate;
      }

      if (minDate.getTime() > userDate.getTime()) {
        dataInput.value = MinDate;
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
      classList: [ClassMap.dashboard.formInput],
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

  private createOptionCurrency(currency: string): HTMLOptionElement {
    const optionCurrency = createElement({
      tag: 'option',
      content: currency,
    }) as HTMLOptionElement;

    optionCurrency.value = currency;
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

  private async getAllCategories() {
    const userAccount = localStorage.getItem(LocalStorageKey.auth);
    let token;

    if (userAccount) {
      const userAccountObj = JSON.parse(userAccount);
      token = userAccountObj.token;
    }

    const response = await RequestApi.getAll(Endpoint.CATEGORY, token);
    console.log(token);
    return response;
  }
}

export default IncomeForm;
