import './Account.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import AppState from '../../constants/appState';
import { LANG, MODE } from '../../types/types';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IUserData, IUserLogin } from '../../types/interfaces';
import UserApi from '../../Api/UserApi';
import {
  alertTimeout,
  avatarsCount,
  LocalStorageKey,
  RegularExpressions,
} from '../../constants/common';
import { RESPONSE_STATUS } from '../../Api/serverConstants';
import AlertMessage from '../../components/AlertMessage/AlertMessege';
import checkForValidity from '../../utils/checkForValidity';

class Account extends BasePage {
  public lang: LANG;

  public modeValue: MODE;

  constructor() {
    super();
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(): void {
    this.createPageStructure(Route.ACCOUNT);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const accountContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.accountSettings],
    });

    accountContainer.append(
      this.createFieldAvatar(),
      this.createFieldPersonalInfo(),
      this.createFieldUpdatePassword(),
    );

    mainContent?.replaceChildren(accountContainer);
  }

  private createFieldAvatar(): HTMLElement {
    const avatarWraper = createElement({
      tag: 'fieldset',
      classList: [ClassMap.accountSettings.fieldset, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const avatarTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.accountSettings.infoTitle],
      key: DictionaryKeys.avatarTitle,
      content: Dictionary[this.lang].avatarTitle,
    });

    const avatarContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const userImg = createElement({ tag: 'img' }) as HTMLImageElement;
    userImg.alt = `${Dictionary[this.lang].avatarTitle}`;

    if (AppState.userAccount) {
      const { avatar } = JSON.parse(AppState.userAccount as string).user as IUserData;
      userImg.src = avatar;
    }

    const userIcon = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.userImg],
    }) as HTMLImageElement;

    userIcon.append(userImg);
    avatarContainer.append(userIcon);

    const updateButton = createElement({
      tag: 'button',
      classList: [ClassMap.accountSettings.update],
      key: DictionaryKeys.updateButton,
      content: Dictionary[this.lang].updateButton,
    }) as HTMLButtonElement;

    avatarWraper.append(
      avatarTitle,
      avatarContainer,
      updateButton,
    );

    let numberAvatar = 1;
    userImg.addEventListener('click', () => {
      numberAvatar = numberAvatar <= avatarsCount ? numberAvatar : 1;
      userImg.src = `assets/avatars/${numberAvatar}.svg`;
      numberAvatar += 1;
    });

    updateButton.addEventListener('click', async () => {
      const imgUrl = `assets/avatars/${userImg.src.split('/').at(-1)}`;

      const updateAvatar: Partial<IUserData> = {
        avatar: imgUrl,
      };

      await this.handleUpdateUserInfoResponse(updateAvatar);
    });

    return avatarWraper;
  }

  private createFieldPersonalInfo(): HTMLElement {
    const personalInfoWraper = createElement({
      tag: 'fieldset',
      classList: [ClassMap.accountSettings.fieldset, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const personalInfoTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.accountSettings.infoTitle],
      key: DictionaryKeys.personalInfoTitle,
      content: Dictionary[this.lang].personalInfoTitle,
    });

    const inputNameContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const inputNameLable = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.labelName,
      content: Dictionary[this.lang].labelName,
    });

    const inputName = createElement({
      tag: 'input',
      classList: [ClassMap.accountSettings.inputName],
    }) as HTMLInputElement;
    inputName.type = 'text';

    inputNameContainer.append(
      inputNameLable,
      inputName,
    );

    const inputEmailContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const inputEmailLable = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.labelEmail,
      content: Dictionary[this.lang].labelEmail,
    });

    const inputEmail = createElement({
      tag: 'input',
      classList: [ClassMap.accountSettings.inputName],
    }) as HTMLInputElement;
    inputEmail.type = 'text';

    inputEmailContainer.append(
      inputEmailLable,
      inputEmail,
    );

    const inputPhoneContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const inputPhoneLable = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.labelPhone,
      content: Dictionary[this.lang].labelPhone,
    });

    const inputPhone = createElement({
      tag: 'input',
      classList: [ClassMap.accountSettings.inputName, ClassMap.accountSettings.inputPhone],
    }) as HTMLInputElement;
    inputPhone.type = 'tel';
    inputPhone.placeholder = '';

    const inputPhonePlus = createElement({
      tag: 'span',
      classList: [ClassMap.accountSettings.inputPhone],
    });

    inputPhoneContainer.append(
      inputPhoneLable,
      inputPhone,
      inputPhonePlus,
    );

    const updateUserInfoButton = createElement({
      tag: 'button',
      classList: [ClassMap.accountSettings.update],
      key: DictionaryKeys.updateButton,
      content: Dictionary[this.lang].updateButton,
    }) as HTMLButtonElement;

    personalInfoWraper.append(
      personalInfoTitle,
      inputNameContainer,
      inputEmailContainer,
      inputPhoneContainer,
      updateUserInfoButton,
    );

    if (AppState.userAccount) {
      const { username, email, phoneNumber } = JSON.parse(AppState.userAccount as string).user as IUserData;
      inputName.value = username;
      inputEmail.value = email;
      inputPhone.value = phoneNumber ? `${phoneNumber}` : '';
    }

    updateUserInfoButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const errors = [...document.querySelectorAll(`.${ClassMap.errorValidation}`)];
      errors.forEach((error) => error.remove());
      const isValid = this.validationUpdateUserInfo(inputName, inputEmail, inputPhone);

      if (isValid) {
        const updateUserInfo: Partial<IUserData> = {
          username: inputName.value,
          email: inputEmail.value,
          phoneNumber: +inputPhone.value,
        };

        await this.handleUpdateUserInfoResponse(updateUserInfo);
      }
    });

    return personalInfoWraper;
  }

  private createFieldUpdatePassword(): HTMLElement {
    const passwordWraper = createElement({
      tag: 'fieldset',
      classList: [ClassMap.accountSettings.fieldset, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const updatePasswordTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.accountSettings.infoTitle],
      key: DictionaryKeys.updatePassword,
      content: Dictionary[this.lang].updatePassword,
    });

    const inputOldPasswordContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const inputOldPasswordLable = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.oldPassword,
      content: Dictionary[this.lang].oldPassword,
    });

    const inputOldPassword = createElement({
      tag: 'input',
      classList: [ClassMap.accountSettings.inputName],
    }) as HTMLInputElement;
    inputOldPassword.type = 'password';

    inputOldPasswordContainer.append(
      inputOldPasswordLable,
      inputOldPassword,
    );

    const inputNewPasswordContainer = createElement({
      tag: 'div',
      classList: [ClassMap.accountSettings.formItem, ClassMap.parentInput],
    });

    const inputNewPasswordLable = createElement({
      tag: 'span',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.newPassword,
      content: Dictionary[this.lang].newPassword,
    });

    const inputNewPassword = createElement({
      tag: 'input',
      classList: [ClassMap.accountSettings.inputName],
    }) as HTMLInputElement;
    inputNewPassword.type = 'password';

    inputNewPasswordContainer.append(
      inputNewPasswordLable,
      inputNewPassword,
    );

    const updatePasswordButton = createElement({
      tag: 'button',
      classList: [ClassMap.accountSettings.update],
      key: DictionaryKeys.updateButton,
      content: Dictionary[this.lang].updateButton,
    }) as HTMLButtonElement;

    passwordWraper.append(
      updatePasswordTitle,
      inputOldPasswordContainer,
      inputNewPasswordContainer,
      updatePasswordButton,
    );

    updatePasswordButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const errors = [...document.querySelectorAll(`.${ClassMap.errorValidation}`)];
      errors.forEach((error) => error.remove());

      const { email } = JSON.parse(AppState.userAccount as string).user as IUserData;
      const isValid = this.validationUpdatePassword(inputOldPassword, inputNewPassword);

      let password = inputOldPassword.value;

      if (isValid && await this.checkOldPassword({ email, password })) {
        password = inputNewPassword.value;
        await this.handleUpdatePasswordResponse({ password });
      }
    });

    return passwordWraper;
  }

  private async handleUpdateUserInfoResponse(updateUserInfo: Partial<IUserData>): Promise<void> {
    const { token } = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string);
    const response = await UserApi.updateUser(token, updateUserInfo);

    let message = '';
    let status = 0;

    if (response && response.status === RESPONSE_STATUS.FORBIDDEN) {
      message = `${Dictionary[AppState.lang].EmailAlreadyExists}`;
      status = RESPONSE_STATUS.FORBIDDEN;
    }

    if (response && response.status === RESPONSE_STATUS.BAD_REQUEST) {
      message = `${Dictionary[AppState.lang].error}`;
      status = RESPONSE_STATUS.BAD_REQUEST;
    }

    if (response && response.user && response.status === RESPONSE_STATUS.OK) {
      message = `${Dictionary[AppState.lang].updated}`;
      status = RESPONSE_STATUS.OK;

      const { user } = response;
      localStorage.setItem(LocalStorageKey.auth, JSON.stringify({ token, user }));
      AppState.userAccount = localStorage.getItem(LocalStorageKey.auth);
      (document.querySelector(`#${IdMap.menuUserName}`) as HTMLElement).innerText = user.username;
      (document.querySelector(`#${IdMap.menuUserImg}`) as HTMLImageElement).src = user.avatar;
    }

    if (message && status > 0) {
      const alert = new AlertMessage(message, status);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
    }
  }

  private validationUpdateUserInfo(
    name: HTMLInputElement,
    email:HTMLInputElement,
    phoneNumber: HTMLInputElement,
  ): boolean {
    const emailIsValid = checkForValidity({
      element: email,
      regularExpression: RegularExpressions.Email,
      errorMessage: Dictionary[this.lang].errorMessageEmail,
    });

    const nameIsValid = checkForValidity({
      element: name,
      regularExpression: RegularExpressions.Name,
      errorMessage: Dictionary[this.lang].errorMessageName,
    });

    const phoneIsValid = phoneNumber.value.length === 0 ? true : checkForValidity({
      element: phoneNumber,
      regularExpression: RegularExpressions.Phone,
      errorMessage: Dictionary[this.lang].errorMessagePhone,
    });

    if (emailIsValid && nameIsValid && phoneIsValid) {
      return true;
    }

    return false;
  }

  private validationUpdatePassword(inputOldPassword: HTMLInputElement, inputNewPassword: HTMLInputElement): boolean {
    const passwordOldIsValid = checkForValidity({
      element: inputOldPassword,
      regularExpression: RegularExpressions.Password,
      errorMessage: Dictionary[this.lang].errorMessagePassword,
    });

    const passwordNewIsValid = checkForValidity({
      element: inputNewPassword,
      regularExpression: RegularExpressions.Password,
      errorMessage: Dictionary[this.lang].errorMessagePassword,
    });

    if (passwordOldIsValid && passwordNewIsValid) {
      return true;
    }

    return false;
  }

  private async checkOldPassword(userLogin: IUserLogin): Promise<boolean> {
    const response = await UserApi.loginUser(userLogin);

    let message = '';
    let status = 0;
    let result = false;

    if (response && response.status === RESPONSE_STATUS.FORBIDDEN) {
      message = `${Dictionary[AppState.lang].InvalidPassword}`;
      status = RESPONSE_STATUS.FORBIDDEN;
    }

    if (response && response.status === RESPONSE_STATUS.OK) {
      result = true;
    }

    if (message && status > 0) {
      const alert = new AlertMessage(message, status);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
    }

    return result;
  }

  private async handleUpdatePasswordResponse(updatePassword: Partial<IUserLogin>): Promise<void> {
    const { token } = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string);
    const response = await UserApi.updateUserPassword(token, updatePassword);

    let message = '';
    let status = 0;

    if (response && response.status === RESPONSE_STATUS.BAD_REQUEST) {
      message = `${Dictionary[AppState.lang].error}`;
      status = RESPONSE_STATUS.BAD_REQUEST;
    }

    if (response && response.status === RESPONSE_STATUS.OK) {
      message = `${Dictionary[AppState.lang].passwordUpdated}`;
      status = RESPONSE_STATUS.OK;
    }

    if (message && status > 0) {
      const alert = new AlertMessage(message, status);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
    }
  }
}

export default Account;
