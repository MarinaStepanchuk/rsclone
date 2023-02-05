import './AuthorizationForm.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG } from '../../types/types';
import RegistrationModal from '../../modals/RegistrationModal/RegistrationModal';
import { RegularExpressions } from '../../constants/common.constants';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';

class AutorisationForm {
  public element;

  constructor(private lang: LANG, private section: HTMLElement) {
    this.element = this.create();
  }

  public create(): HTMLElement {
    const form = createElement({ tag: 'form', classList: [ClassMap.authorization.form, ClassMap.mode.light.background] }) as HTMLFormElement;

    const inputContainerEmail = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.formItem, ClassMap.parentInput],
    });
    const inputEmailLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelEmail,
      content: Dictionary[this.lang].labelEmail,
    });
    const inputEmail = createElement({
      tag: 'input',
      classList: [ClassMap.authorization.inputEmail],
    }) as HTMLInputElement;
    inputEmail.type = 'text';
    inputContainerEmail.append(inputEmailLable, inputEmail);

    const inputContainerPassword = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.formItem, ClassMap.parentInput],
    });
    const wrapperPassword = createElement({
      tag: 'div',
      classList: [ClassMap.wrapperPassword],
    });
    const inputPasswordLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelPassword,
      content: Dictionary[this.lang].labelPassword,
    });
    const inputPassword = createElement({
      tag: 'input',
      classList: [ClassMap.authorization.inputPassword],
    }) as HTMLInputElement;
    inputPassword.type = 'password';
    const hidingPassword = createElement({
      tag: 'div',
      classList: [ClassMap.passwordIcon],
    });
    wrapperPassword.append(inputPassword, hidingPassword);
    inputContainerPassword.append(inputPasswordLable, wrapperPassword);

    const registrationInvitation = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.registration],
    });
    const invitationText = createElement({
      tag: 'span',
      classList: [ClassMap.authorization.registrationText],
      key: DictionaryKeys.registrationLinkText,
      content: Dictionary[this.lang].registrationLinkText,
    });
    const invitationLink = createElement({
      tag: 'span',
      classList: [ClassMap.authorization.registrationLink, ClassMap.mode.light.font],
      key: DictionaryKeys.signUpButton,
      content: Dictionary[this.lang].signUpButton,
    });
    registrationInvitation.append(invitationText, invitationLink);

    const signInButton = createElement({
      tag: 'button',
      classList: [ClassMap.authorization.signInButton],
      key: DictionaryKeys.signInButton,
      content: Dictionary[this.lang].signInButton,
    }) as HTMLButtonElement;

    form.append(inputContainerEmail, inputContainerPassword, registrationInvitation, signInButton);

    this.addFormListeners(form);

    return form;
  }

  private addFormListeners(form: HTMLFormElement): void {
    const password = form.querySelector(`.${ClassMap.authorization.inputPassword}`) as HTMLInputElement;

    form.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.authorization.registrationLink)) {
        const modal = new RegistrationModal(this.lang).element;
        this.section.append(modal);
      }

      if (targetElement.classList.contains(ClassMap.passwordIcon)) {
        const icon = targetElement;
        icon.classList.toggle(ClassMap.showPassword);
        password.type = icon.classList.contains(ClassMap.showPassword) ? 'text' : 'password';
      }

      if (targetElement.classList.contains(ClassMap.authorization.signInButton)) {
        event.preventDefault();
        const errors = Array.from(document.querySelectorAll(`.${ClassMap.errorValidation}`));
        errors.forEach((error) => error.remove());
        const findError = this.validation(form);

        if (findError) {
          return;
        }

        console.log(1);
        // отправка запроса
        // в случае удачного запроса навешивание атрибута и перенаправление на следующую страницу
      }
    });
  }

  private validation(form: HTMLFormElement): boolean {
    const email = form.querySelector(`.${ClassMap.authorization.inputEmail}`) as HTMLInputElement;
    const password = form.querySelector(`.${ClassMap.authorization.inputPassword}`) as HTMLInputElement;

    let findError = false;

    if (!email.value.match(RegularExpressions.Email)) {
      showErrorValidationMessage(email, Dictionary[this.lang].errorMessageEmail);
      findError = true;
    } else {
      removeErrorValidationMessage(email);
    }

    if (!password.value.match(RegularExpressions.Password)) {
      showErrorValidationMessage(password, Dictionary[this.lang].errorMessagePassword);
      findError = true;
    } else {
      removeErrorValidationMessage(password);
    }

    return findError;
  }
}

export default AutorisationForm;
