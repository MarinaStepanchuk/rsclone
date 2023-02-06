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

  private form: HTMLFormElement | null = null;

  private email: HTMLInputElement | null = null;

  private password: HTMLInputElement | null = null;

  constructor(private lang: LANG, private section: HTMLElement) {
    this.init();
    this.element = this.form;
    this.fill();
    this.addListeners();
  }

  private init(): void {
    this.form = createElement({
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

    inputContainerEmail.append(inputEmailLable, this.email as HTMLInputElement);

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

    const signInButton = createElement({
      tag: 'button',
      classList: [ClassMap.authorization.signInButton],
      key: DictionaryKeys.signInButton,
      content: Dictionary[this.lang].signInButton,
    }) as HTMLButtonElement;

    this.form?.append(
      inputContainerEmail,
      inputContainerPassword,
      registrationInvitation,
      signInButton,
    );
  }

  private addListeners(): void {
    this.form?.addEventListener('click', (event) => {
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
        const errors = Array.from(document.querySelectorAll(`.${ClassMap.errorValidation}`));
        errors.forEach((error) => error.remove());
        const findError = this.validation();

        if (findError) {
          return;
        }

        console.log(1);
        // отправка запроса
        // в случае удачного запроса навешивание атрибута и перенаправление на следующую страницу
      }
    });
  }

  private validation(): boolean {
    let findError = false;
    const email = this.email as HTMLInputElement;
    const password = this.password as HTMLInputElement;

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
