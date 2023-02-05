import './RegistrationModal.scss';
import createElement from '../../utils/createElement';
import { ClassMap, Сurrency } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG } from '../../types/types';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';
import { RegularExpressions } from '../../constants/common.constants';

class RegistrationModal {
  public element;

  constructor(private lang: LANG) {
    this.element = this.create();
  }

  public create(): HTMLElement {
    const form = createElement({ tag: 'form', classList: [ClassMap.registration.form, ClassMap.mode.dark.background] }) as HTMLFormElement;

    const formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.registration.formTitle, ClassMap.mode.dark.title],
      key: DictionaryKeys.registrationTitle,
      content: Dictionary[this.lang].registrationTitle,
    });

    const inputContainerEmail = createElement({
      tag: 'div',
      classList: [ClassMap.registration.formItem, ClassMap.parentInput],
    });
    const inputEmailLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelEmail,
      content: Dictionary[this.lang].labelEmail,
    });
    const inputEmail = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputEmail],
    }) as HTMLInputElement;
    inputEmail.type = 'text';
    inputContainerEmail.append(inputEmailLable, inputEmail);

    const inputContainerName = createElement({
      tag: 'div',
      classList: [ClassMap.registration.formItem, ClassMap.parentInput],
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
      classList: [ClassMap.registration.formItem, ClassMap.parentInput],
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
      classList: [ClassMap.registration.formItem, ClassMap.parentInput],
    });
    const inputPasswordLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelPassword,
      content: Dictionary[this.lang].labelPassword,
    });
    const wrapperPassword = createElement({
      tag: 'div',
      classList: [ClassMap.wrapperPassword],
    });
    const inputPassword = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputPassword],
    }) as HTMLInputElement;
    inputPassword.type = 'password';
    const hidingPassword = createElement({
      tag: 'div',
      classList: [ClassMap.passwordIcon],
    });
    wrapperPassword.append(inputPassword, hidingPassword);
    inputContainerPassword.append(inputPasswordLable, wrapperPassword);

    const inputContainerConfirmPassword = createElement({
      tag: 'div',
      classList: [ClassMap.registration.formItem, ClassMap.parentInput],
    });
    const inputConfirmPasswordLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelConfirmPassword,
      content: Dictionary[this.lang].labelConfirmPassword,
    });
    const wrapperConfirmPassword = createElement({
      tag: 'div',
      classList: [ClassMap.wrapperPassword],
    });
    const inputConfirmPassword = createElement({
      tag: 'input',
      classList: [ClassMap.registration.inputConfirmPassword],
    }) as HTMLInputElement;
    inputConfirmPassword.type = 'password';
    const hidingConfirmPassword = createElement({
      tag: 'div',
      classList: [ClassMap.passwordIcon],
    });
    wrapperConfirmPassword.append(inputConfirmPassword, hidingConfirmPassword);
    inputContainerConfirmPassword.append(inputConfirmPasswordLable, wrapperConfirmPassword);

    const submit = createElement({
      tag: 'button',
      classList: [ClassMap.registration.submit],
      key: DictionaryKeys.signUpButton,
      content: Dictionary[this.lang].signUpButton,
    }) as HTMLButtonElement;

    const closeButton = createElement({
      tag: 'div',
      classList: [ClassMap.closeModalButton],
    });
    const firstLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode.light.background],
    });
    const secondLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode.light.background],
    });
    closeButton.append(firstLine, secondLine);

    form.append(formTitle, inputContainerEmail, inputContainerName, selectContainerCurrency, inputContainerPassword, inputContainerConfirmPassword, submit, closeButton);

    const formWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.registration.wrapper],
    });

    this.addFormListeners(form);

    formWrapper.append(form);

    formWrapper.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.classList.contains(ClassMap.registration.wrapper) || targetElement.classList.contains(ClassMap.closeModalButton) || targetElement.classList.contains(ClassMap.closeLine)) {
        this.element.remove();
      }
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

  private addFormListeners(form: HTMLFormElement): void {
    form.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.passwordIcon)) {
        const icon = targetElement;
        icon.classList.toggle(ClassMap.showPassword);
        const parent = icon.closest(`.${ClassMap.wrapperPassword}`);
        const input = parent?.getElementsByTagName('input')[0] as HTMLInputElement;
        input.type = icon.classList.contains(ClassMap.showPassword) ? 'text' : 'password';
      }

      if (targetElement.classList.contains(ClassMap.registration.submit)) {
        event.preventDefault();
        const errors = Array.from(document.querySelectorAll(`.${ClassMap.errorValidation}`));
        errors.forEach((error) => error.remove());
        const findError = this.validation(form);

        if (findError) {
          return;
        }

        // обработка запроса
        this.element.remove();
      }
    });
  }

  private validation(form: HTMLFormElement): boolean {
    const email = form.querySelector(`.${ClassMap.registration.inputEmail}`) as HTMLInputElement;
    const name = form.querySelector(`.${ClassMap.registration.inputName}`) as HTMLInputElement;
    const password = form.querySelector(`.${ClassMap.registration.inputPassword}`) as HTMLInputElement;
    const confirmPassword = form.querySelector(`.${ClassMap.registration.inputConfirmPassword}`) as HTMLInputElement;

    let findError = false;

    if (!email.value.match(RegularExpressions.Email)) {
      showErrorValidationMessage(email, Dictionary[this.lang].errorMessageEmail);
      findError = true;
    } else {
      removeErrorValidationMessage(email);
    }

    if (!name.value.match(RegularExpressions.Name)) {
      showErrorValidationMessage(name, Dictionary[this.lang].errorMessageName);
      findError = true;
    } else {
      removeErrorValidationMessage(name);
    }

    if (!password.value.match(RegularExpressions.Password)) {
      showErrorValidationMessage(password, Dictionary[this.lang].errorMessagePassword);
      findError = true;
    } else {
      removeErrorValidationMessage(password);
    }

    if (password.value !== confirmPassword.value) {
      showErrorValidationMessage(confirmPassword, Dictionary[this.lang].errorMessageConfirmPassword);
      findError = true;
    } else {
      removeErrorValidationMessage(confirmPassword);
    }

    return findError;
  }
}

export default RegistrationModal;
