import './SupportModal.scss';

import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';

const messageContentSettings = {
  rows: 10,
  minLength: 5,
  maxLength: 1000,
};

class SupportModal {
  public element: HTMLElement | null = null;

  private form: HTMLFormElement | null = null;

  private messageContent: HTMLTextAreaElement | null = null;

  private submit: HTMLButtonElement | null = null;

  constructor(private lang: LANG, private modeValue: MODE) {
    this.init();
    this.fill();
    this.addListeners();
  }

  private init(): void {
    this.form = createElement({
      tag: 'form',
      classList: [ClassMap.support.form, ClassMap.mode[this.modeValue].modal],
    }) as HTMLFormElement;

    this.element = createElement({
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

    this.element?.append(this.form as HTMLFormElement);
  }

  private addListeners(): void {
    this.element?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.support.wrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.element?.remove();
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
        && (this.submit as HTMLButtonElement).disabled === false) {
        event.preventDefault();

        console.log('async func handleSupportResponse');

        this.element?.remove();
      }
    });
  }
}

export default SupportModal;
