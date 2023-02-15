import './IncomeForm.scss';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import {Currency} from "../../constants/common";

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

    Currency.forEach((currency) => (categorySelect as HTMLSelectElement).append(this.createOptionCurrency(currency)));

    categoryWrap.append(categoryLabel, categorySelect);

    const sumLabel = createElement({
      tag: 'label',
      key: DictionaryKeys.labelSum,
      content: Dictionary[this.lang].labelSum,
    }) as HTMLLabelElement;

    const sumInput = createElement({
      tag: 'input',
      classList: [ClassMap.dashboard.formInput],
    }) as HTMLInputElement;

    sumInput.type = 'number';

    const sumWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    sumWrap.append(sumLabel, sumInput);

    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.dashboard.incomeForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formWrapper],
    });

    this.form.append(
      formTitle,
      categoryWrap,
      sumWrap,
      // closeButton,
    );

    this.modalWrapper.append(this.form);

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
}

export default IncomeForm;
