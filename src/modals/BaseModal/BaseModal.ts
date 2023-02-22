import './BaseModal.scss';
import { IAccount, ICategory } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import createElement from '../../utils/createElement';
import {
  ClassMap,
  IdMap,
  InputType,
  InputValue,
  MinDate,
  TextArea,
} from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { CurrencyMark } from '../../types/enums';
import { getAllAccounts, getAllCategories } from '../../utils/getModalApi';

class BaseModal {
  protected modeValue: MODE;

  protected readonly lang: LANG;

  protected readonly currency: CURRENCY;

  public modalWrapper: HTMLElement | null = null;

  protected form: HTMLFormElement | null = null;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public createFormTitle(formTitle: string, formContent: string): HTMLElement {
    const formTitleWrap = createElement({
      tag: 'legend',
      classList: [ClassMap.dashboard.formTitle, ClassMap.mode[this.modeValue].modalTitle],
      key: formTitle,
      content: formContent,
    });

    return formTitleWrap;
  }

  public createAccountWrap(): HTMLElement {
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

    const accountsAll = getAllAccounts();

    accountsAll.then((accounts) => {
      accounts.forEach((account) => {
        (accountSelect as HTMLSelectElement).append(this.createOptionAccount(account));
      });
    });

    accountWrap.append(accountLabel, accountSelect);

    return accountWrap;
  }

  public createCategoriesWrap(): HTMLElement {
    const categoryLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelCategory,
      content: Dictionary[this.lang].labelCategory,
    }) as HTMLLabelElement;

    const categorySelect = createElement({
      tag: 'select',
      classList: [ClassMap.dashboard.formSelect],
      id: IdMap.categorySelect,
    }) as HTMLSelectElement;

    const categoryWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem, ClassMap.parentInput],
    });

    const categoriesAll = getAllCategories();

    categoriesAll.then((categories) => {
      categories.forEach((category) => {
        (categorySelect as HTMLSelectElement).append(this.createOptionCategory(category));
      });
    });

    categoryWrap.append(categoryLabel, categorySelect);

    return categoryWrap;
  }

  public createSumWrap(): HTMLElement {
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
      id: IdMap.sumInput,
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

    return sumWrap;
  }

  public createDateWrap(): HTMLElement {
    const dateLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelDate,
      content: Dictionary[this.lang].labelDate,
    }) as HTMLLabelElement;

    const dateInput = createElement({
      tag: 'input',
      classList: [ClassMap.dashboard.formInput],
      id: IdMap.dateValue,
    }) as HTMLInputElement;

    dateInput.type = InputType.date;
    dateInput.min = MinDate;

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    const todayFullDate = `${year}-${month.toString().padStart(2, '0')}-${day}`;

    dateInput.value = todayFullDate;

    dateInput.addEventListener('change', () => {
      const userDate = new Date(dateInput.value);
      // const minDate = new Date(MinDate);

      // if (minDate.getTime() > userDate.getTime()) {
      //     dataInput.value = MinDate;
      //   }

      if (userDate.getTime() > todayDate.getTime()) {
        dateInput.value = todayFullDate;
      }
    });

    const dateWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    dateWrap.append(dateLabel, dateInput);

    return dateWrap;
  }

  public createCommentWrap(): HTMLElement {
    const commentLabel = createElement({
      tag: 'label',
      classList: [ClassMap.dashboard.formLabel],
      key: DictionaryKeys.labelNote,
      content: Dictionary[this.lang].labelNote,
      id: IdMap.comment,
    }) as HTMLLabelElement;

    const commentText = createElement({
      tag: 'textarea',
      classList: [ClassMap.dashboard.formInput, ClassMap.dashboard.formTextarea],
    }) as HTMLTextAreaElement;

    commentText.rows = TextArea.rows;
    commentText.minLength = TextArea.minLength;
    commentText.maxLength = TextArea.maxLength;

    const commentWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.formItem],
    });

    commentWrap.append(commentLabel, commentText);
    return commentWrap;
  }

  public createCloseButton(): HTMLElement {
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

    return closeFormButton;
  }

  public createFormSubmitButton(submitButtonTitle: string, submitButtonContent: string): HTMLElement {
    const submitButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.formSubmitButton],
      key: submitButtonTitle,
      content: submitButtonContent,
    }) as HTMLButtonElement;

    return submitButton;
  }

  private createOptionAccount(account: IAccount): HTMLOptionElement {
    const { key = '', account: name } = account;
    return this.createOptionItem(key, name);
  }

  private createOptionCategory(category: ICategory): HTMLOptionElement {
    const { key = '', category: name } = category;
    return this.createOptionItem(key, name);
  }

  private createOptionItem(key: string, name: string): HTMLOptionElement {
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
    return optionItem;
  }

  public addListeners(): void {
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
}

export default BaseModal;
