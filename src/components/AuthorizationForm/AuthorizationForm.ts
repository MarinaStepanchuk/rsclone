import './AuthorizationForm.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG } from '../../types/types';
import RegistrationModal from '../../modals/RegistrationModal/RegistrationModal';
import { RegularExpressions } from '../../constants/common';
import checkForValidity from '../../utils/checkForValidity';
import Route from '../../types/enums';

class AutorisationForm {
  public element: HTMLFormElement | null = null;

  private email: HTMLInputElement | null = null;

  private password: HTMLInputElement | null = null;

  private signInButton: HTMLButtonElement | null = null;

  constructor(private lang: LANG, private section: HTMLElement) {
    this.init();
    this.fill();
    this.addListeners();
  }

  private init(): void {
    this.element = createElement({
      tag: 'form',
      classList: [ClassMap.authorization.form, ClassMap.mode.light.background],
    }) as HTMLFormElement;

    this.email = createElement({
      tag: 'input',
      classList: [ClassMap.authorization.inputEmail],
    }) as HTMLInputElement;
    this.email.type = 'text';

    this.password = createElement({
      tag: 'input',
      classList: [ClassMap.authorization.inputPassword],
    }) as HTMLInputElement;
    this.password.type = 'password';

    this.signInButton = createElement({
      tag: 'button',
      classList: [ClassMap.authorization.signInButton],
      key: DictionaryKeys.signInButton,
      content: Dictionary[this.lang].signInButton,
    }) as HTMLButtonElement;
  }

  public fill() {
    const inputContainerEmail = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.formItem, ClassMap.parentInput],
    });

    const inputEmailLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelEmail,
      content: Dictionary[this.lang].labelEmail,
    });

    inputContainerEmail.append(
      inputEmailLable,
      this.email as HTMLInputElement,
    );

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

    const hidingPassword = createElement({
      tag: 'div',
      classList: [ClassMap.passwordIcon],
    });

    wrapperPassword.append(this.password as HTMLInputElement, hidingPassword);
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

    this.element?.append(
      inputContainerEmail,
      inputContainerPassword,
      registrationInvitation,
      this.signInButton as HTMLButtonElement,
    );
  }

  private addListeners(): void {
    this.element?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.authorization.registrationLink)) {
        const modal = new RegistrationModal(this.lang).element;
        this.section.append(modal as HTMLElement);
      }

      if (targetElement.classList.contains(ClassMap.passwordIcon)) {
        const icon = targetElement;
        icon.classList.toggle(ClassMap.showPassword);
        const password = this.password as HTMLInputElement;
        password.type = icon.classList.contains(ClassMap.showPassword) ? 'text' : 'password';
      }

      if (targetElement.classList.contains(ClassMap.authorization.signInButton)) {
        event.preventDefault();
        const errors = [...document.querySelectorAll(`.${ClassMap.errorValidation}`)];
        errors.forEach((error) => error.remove());
        const isValid = this.validation();

        if (isValid) {
          // отправка запроса
          (this.signInButton as HTMLButtonElement).setAttribute('data-link', Route.WALLET);
          console.log(1);
        }
      }
    });
  }

  private validation(): boolean {
    const email = this.email as HTMLInputElement;
    const password = this.password as HTMLInputElement;

    const emailIsValid = checkForValidity({
      element: email,
      regularExpression: RegularExpressions.Email,
      errorMessage: Dictionary[this.lang].errorMessageEmail,
    });

    const passwordIsValid = checkForValidity({
      element: password,
      regularExpression: RegularExpressions.Password,
      errorMessage: Dictionary[this.lang].errorMessagePassword,
    });

    if (emailIsValid && passwordIsValid) {
      return true;
    }
    return false;
  }
}

export default AutorisationForm;
