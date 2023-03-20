import './BaseCreater.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { CURRENCY, LANG, MODE } from '../../types/types';
import { LocalStorageKey } from '../../constants/common';
import AppState from '../../constants/appState';
import { CurrencyMark } from '../../types/enums';

const defaultBalance = '0';

class BaseCreater {
  protected modalWrapper: HTMLElement | null = null;

  protected form: HTMLFormElement | null = null;

  protected submit: HTMLButtonElement | null = null;

  protected modeValue: MODE;

  protected lang: LANG;

  protected inputName: HTMLInputElement | null = null;

  protected icon: HTMLElement | null = null;

  protected formTitle: HTMLElement | null = null;

  protected inputBalance: HTMLInputElement | null = null;

  protected itemNameTitle: HTMLElement | null = null;

  protected itemBalanceTitle: HTMLElement | null = null;

  protected itemBalance: HTMLElement | null = null;

  protected currency: CURRENCY;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    this.init();
    this.fill();
  }

  protected init(): void {
    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.creater.createForm, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createWrapper],
    });

    this.inputName = createElement({
      tag: 'input',
      classList: [ClassMap.creater.createName],
    }) as HTMLInputElement;
    this.inputName.type = 'text';

    this.icon = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createIcon],
    });

    this.inputBalance = createElement({
      tag: 'input',
      classList: [ClassMap.creater.createBalance],
    }) as HTMLInputElement;
    this.inputBalance.type = 'number';
    this.inputBalance.value = defaultBalance;

    this.submit = createElement({
      tag: 'button',
      classList: [ClassMap.creater.createSubmit],
    }) as HTMLButtonElement;
    this.submit.disabled = true;

    this.formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.creater.createTitle, ClassMap.mode[this.modeValue].modalTitle],
    });

    this.itemNameTitle = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].modalFont],
    });

    this.itemBalanceTitle = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].modalFont],
    });

    this.itemBalance = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createItem],
    });
  }

  protected fill(): void {
    const itemName = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createItem],
    });

    const containerInputName = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createInputContainer, ClassMap.parentInput],
    });

    containerInputName.append(this.itemNameTitle as HTMLElement, this.inputName as HTMLInputElement);

    itemName.append(this.icon as HTMLElement, containerInputName);

    const containerInputBalance = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createInputContainer],
    });

    containerInputBalance.append(this.itemBalanceTitle as HTMLElement, this.inputBalance as HTMLInputElement);

    const iconCurrency = createElement({
      tag: 'div',
      classList: [ClassMap.creater.createCurrency],
      content: `${CurrencyMark[this.currency]}`,
    });

    (this.itemBalance as HTMLElement).append(iconCurrency, containerInputBalance);

    const closeButton = createElement({
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
    closeButton.append(firstLine, secondLine);

    this.form?.append(
      this.formTitle as HTMLElement,
      itemName,
      this.itemBalance as HTMLElement,
      this.submit as HTMLButtonElement,
      closeButton,
    );

    this.modalWrapper?.append(this.form as HTMLFormElement);

    this.modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.creater.createWrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.modalWrapper?.remove();
      }
    });
  }
}

export default BaseCreater;
