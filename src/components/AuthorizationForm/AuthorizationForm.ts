import './AuthorizationForm.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import RegistrationModal from '../../modals/RegistrationModal/RegistrationModal';
import { alertTimeout, LocalStorageKey, RegularExpressions } from '../../constants/common';
import checkForValidity from '../../utils/checkForValidity';
import { IUserLogin } from '../../types/interfaces';
import UserApi from '../../Api/UserApi';
import { RESPONSE_STATUS } from '../../Api/serverConstants';
import AppState from '../../constants/appState';
import AlertMessage from '../AlertMessage/AlertMessege';
import Dashboard from '../../pages/Dashboard/Dashboard';

class AutorisationForm {
  public form: HTMLFormElement | null = null;

  private email: HTMLInputElement | null = null;

  private password: HTMLInputElement | null = null;

  private signInButton: HTMLButtonElement | null = null;

  private modeValue: MODE;

  private lang: LANG;

  constructor(private section: HTMLElement) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.init();
  }

  private init(): void {
    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.authorization.form, ClassMap.mode[this.modeValue].background],
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

  public render(): HTMLFormElement {
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
      classList: [ClassMap.authorization.registrationLink, ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.signUpButton,
      content: Dictionary[this.lang].signUpButton,
    });

    registrationInvitation.append(invitationText, invitationLink);

    this.form?.append(
      inputContainerEmail,
      inputContainerPassword,
      registrationInvitation,
      this.signInButton as HTMLButtonElement,
    );

    this.addListeners();

    return this.form as HTMLFormElement;
  }

  private addListeners(): void {
    this.form?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.authorization.registrationLink)) {
        const modal = new RegistrationModal().render();
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
          const userDataLogin: IUserLogin = {
            email: (this.email as HTMLInputElement).value,
            password: (this.password as HTMLInputElement).value,
          };

          this.handleLoginResponse(userDataLogin);
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

  private async handleLoginResponse(userLogin: IUserLogin) {
    const response = await UserApi.loginUser(userLogin);

    let message = '';
    let status = 0;

    if (response && response.message.includes('successful')) {
      message = `${Dictionary[AppState.lang].loginStatus}`;
      status = RESPONSE_STATUS.OK;
    }

    if (response && response.message.includes('not found')) {
      message = `${Dictionary[AppState.lang].EmailNotFound}`;
      status = RESPONSE_STATUS.FORBIDDEN;
    }

    if (response && response.message.includes('Invalid password')) {
      message = `${Dictionary[AppState.lang].InvalidPassword}`;
      status = RESPONSE_STATUS.FORBIDDEN;
    }

    if (message && status > 0) {
      const alert = new AlertMessage(message, status);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
    }

    if (response?.status === RESPONSE_STATUS.OK) {
      AppState.isUserLogin = true;
      const { token, user } = response;
      localStorage.setItem(LocalStorageKey.auth, JSON.stringify({ token, user }));
      AppState.userAccount = localStorage.getItem(LocalStorageKey.auth);
      new Dashboard().render();
    }
  }
}

export default AutorisationForm;
