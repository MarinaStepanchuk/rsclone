import { ClassMap } from '../constants/htmlConstants';
import createElement from './createElement';

const showErrorValidationMessage = (input: HTMLInputElement, message: string) => {
  const parent = input.closest(`.${ClassMap.parentInput}`);
  const error = createElement({
    tag: 'p',
    classList: [ClassMap.errorValidation],
    content: message,
  });
  parent?.append(error);
};

export default showErrorValidationMessage;
