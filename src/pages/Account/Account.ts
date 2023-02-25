import './Account.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import AppState from '../../constants/appState';
import { LANG, MODE } from '../../types/types';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { IUserData } from '../../types/interfaces';

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
      classList: [ClassMap.accountSettings.inputName],
    }) as HTMLInputElement;
    inputPhone.type = 'tel';

    inputPhoneContainer.append(
      inputPhoneLable,
      inputPhone,
    );

    const updateButton = createElement({
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
      updateButton,
    );

    if (AppState.userAccount) {
      const { username, email, phoneNumber } = JSON.parse(AppState.userAccount as string).user as IUserData;
      inputName.value = username;
      inputEmail.value = email;
      inputPhone.value = phoneNumber ? `${phoneNumber}` : '';
    }

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
    inputOldPassword.type = 'text';

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
    inputOldPassword.type = 'text';

    inputNewPasswordContainer.append(
      inputNewPasswordLable,
      inputNewPassword,
    );

    const updateButton = createElement({
      tag: 'button',
      classList: [ClassMap.accountSettings.update],
      key: DictionaryKeys.updateButton,
      content: Dictionary[this.lang].updateButton,
    }) as HTMLButtonElement;

    passwordWraper.append(
      updatePasswordTitle,
      inputOldPasswordContainer,
      inputNewPasswordContainer,
      updateButton,
    );
    return passwordWraper;
  }
}

export default Account;
