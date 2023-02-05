import './RegistrationModal.scss';
import createElement from '../../utils/createElement';
import { ClassMap, Сurrency } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG } from '../../types/types';

class RegistrationModal {
  public element;

  constructor(private lang: LANG) {
    this.element = this.create();
  }

  public create(): HTMLElement {
    const form = createElement({ tag: 'form', classList: [ClassMap.registration.form, ClassMap.mode.dark.background] });

    const formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.registration.formTitle, ClassMap.mode.dark.title],
      key: DictionaryKeys.registrationTitle,
      content: Dictionary[this.lang].registrationTitle,
    });

    const inputContainerEmail = createElement({
      tag: 'div',
      classList: [ClassMap.registration.formItem],
    });
    const inputEmailLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelEmail,
      content: Dictionary[this.lang].labelEmail,
    });
    const inputEmail = createElement({
      tag: 'input',
      classList: [ClassMap.autorisation.inputEmail],
    }) as HTMLInputElement;
    inputEmail.type = 'text';
    inputContainerEmail.append(inputEmailLable, inputEmail);

    const inputContainerName = createElement({
      tag: 'div',
      classList: [ClassMap.autorisation.formItem],
    });
    const inputNameLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelName,
      content: Dictionary[this.lang].labelName,
    });
    const inputName = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputName],
    }) as HTMLInputElement;
    inputEmail.type = 'text';
    inputContainerName.append(inputNameLable, inputName);

    const selectContainerCurrency = createElement({
      tag: 'div',
      classList: [ClassMap.autorisation.formItem],
    });
    const selectCurrencyLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelCurrencySelection,
      content: Dictionary[this.lang].labelCurrencySelection,
    });
    const selectCurrency = createElement({
      tag: 'select',
      classList: [ClassMap.registration.selectCurrency],
    }) as HTMLSelectElement;
    inputEmail.type = 'text';
    selectContainerCurrency.append(selectCurrencyLable, selectCurrency);

    Сurrency.forEach((currency) => selectCurrency.append(this.createOptionCurrency(currency)));

    const inputContainerPassword = createElement({
      tag: 'div',
      classList: [ClassMap.autorisation.formItem],
    });
    const inputPasswordLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelPassword,
      content: Dictionary[this.lang].labelPassword,
    });
    const inputPassword = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputPassword],
    }) as HTMLInputElement;
    inputEmail.type = 'password';
    const hidingPassword = createElement({
      tag: 'div',
      classList: [ClassMap.hidingPassword],
    });
    inputContainerPassword.append(inputPasswordLable, inputPassword, hidingPassword);

    const inputContainerConfirmPassword = createElement({
      tag: 'div',
      classList: [ClassMap.registration.formItem],
    });
    const inputConfirmPasswordLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelConfirmPassword,
      content: Dictionary[this.lang].labelConfirmPassword,
    });
    const inputConfirmPassword = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputConfirmPassword],
    }) as HTMLInputElement;
    inputEmail.type = 'password';
    const hidingConfirmPassword = createElement({
      tag: 'div',
      classList: [ClassMap.hidingPassword],
    });
    inputContainerConfirmPassword.append(inputConfirmPasswordLable, inputConfirmPassword, hidingConfirmPassword);

    const signInButton = createElement({
      tag: 'button',
      classList: [ClassMap.registration.submit],
      key: DictionaryKeys.signUpButton,
      content: Dictionary[this.lang].signUpButton,
    }) as HTMLButtonElement;

    const closeButton = createElement({
      tag: 'div',
      classList: [ClassMap.registration.close],
    });
    const firstLine = createElement({
      tag: 'span',
      classList: [ClassMap.mode.light.background],
    });
    const secondLine = createElement({
      tag: 'span',
      classList: [ClassMap.mode.light.background],
    });
    closeButton.append(firstLine, secondLine);

    form.append(formTitle, inputContainerEmail, inputContainerName, selectContainerCurrency, inputContainerPassword, inputContainerConfirmPassword, signInButton, closeButton);

    const formWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.registration.wrapper],
    });
    formWrapper.append(form);

    this.element.addEventListener('click', (event) => {
      const targetElement = event.target;
      // switch(targetElement) 
    });

    return formWrapper;
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

export default RegistrationModal;
