import './SupportModal.scss';

import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import { ISupportMsg } from '../../types/interfaces';
import TelegramMsgApi from '../../Api/TelegramMsgApi';
import AlertMessage from '../../components/AlertMessage/AlertMessege';
import { alertTimeout } from '../../constants/common';
import { RESPONSE_STATUS } from '../../Api/serverConstants';
import AppState from '../../constants/appState';

const messageContentSettings = {
  rows: 10,
  minLength: 5,
  maxLength: 1000,
};

class SupportModal {
  public modalWrapper: HTMLElement | null = null;

  private form: HTMLFormElement | null = null;

  private messageContent: HTMLTextAreaElement | null = null;

  private submit: HTMLButtonElement | null = null;

  private modeValue: MODE;

  private lang: LANG;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.init();
    this.fill();
    this.addListeners();
  }

  private init(): void {
    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.support.form, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.support.wrapper],
    });

    this.messageContent = createElement({
      tag: 'textarea',
      classList: [ClassMap.support.inputMessage],
    }) as HTMLTextAreaElement;
    this.messageContent.rows = messageContentSettings.rows;
    this.messageContent.minLength = messageContentSettings.minLength;
    this.messageContent.maxLength = messageContentSettings.maxLength;
    this.messageContent.autofocus = true;
    this.messageContent.required = true;
  }

  public fill() {
    const formTitle = createElement({
      tag: 'legend',
      classList: [ClassMap.support.formTitle, ClassMap.mode[this.modeValue].modalTitle],
      key: DictionaryKeys.supportTitle,
      content: Dictionary[this.lang].supportTitle,
    });

    const inputContainerQuestion = createElement({
      tag: 'div',
      classList: [ClassMap.support.formItem, ClassMap.parentInput],
    });

    const inputQuestionLable = createElement({
      tag: 'span',
      key: DictionaryKeys.labelQuestion,
      content: Dictionary[this.lang].labelQuestion,
    });

    inputContainerQuestion.append(
      inputQuestionLable,
      this.messageContent as HTMLTextAreaElement,
    );

    this.submit = createElement({
      tag: 'button',
      classList: [ClassMap.support.submit],
      key: DictionaryKeys.supportSubmitButton,
      content: Dictionary[this.lang].supportSubmitButton,
    }) as HTMLButtonElement;
    this.submit.disabled = true;

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
      formTitle,
      inputContainerQuestion,
      this.submit,
      closeButton,
    );

    this.modalWrapper?.append(this.form as HTMLFormElement);
  }

  private addListeners(): void {
    this.modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.support.wrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.modalWrapper?.remove();
      }
    });

    this.messageContent?.addEventListener('input', () => {
      if ((this.messageContent as HTMLTextAreaElement).value.length >= messageContentSettings.minLength) {
        (this.submit as HTMLButtonElement).disabled = false;
      }
    });

    this.form?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.support.submit)
        && (this.submit as HTMLButtonElement).disabled === false
        && AppState.userAccount) {
        event.preventDefault();

        const userName: string = JSON.parse(AppState.userAccount).user.username;
        const userEmail: string = JSON.parse(AppState.userAccount).user.email;
        const userToken: string = JSON.parse(AppState.userAccount).token;

        const message: ISupportMsg = {
          username: userName,
          email: userEmail,
          message: (this.messageContent as HTMLTextAreaElement).value,
        };

        this.handleSupportResponse(userToken, message);
      }
    });
  }

  private async handleSupportResponse(token: string, message: ISupportMsg) {
    const response = await TelegramMsgApi.sendMsg(token, message);

    const alert = new AlertMessage(response.message, response.status);
    alert.render();
    setTimeout(() => alert.remove(), alertTimeout);

    if (response.status === RESPONSE_STATUS.OK) {
      this.modalWrapper?.remove();
    }
  }
}

export default SupportModal;
