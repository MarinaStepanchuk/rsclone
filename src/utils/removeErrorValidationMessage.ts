import { ClassMap } from '../constants/htmlConstants';

const removeErrorValidationMessage = (input: HTMLInputElement) => {
  const parent = input.closest(`.${ClassMap.parentInput}`);
  const error = parent?.querySelector(`.${ClassMap.errorValidation}`);
  error?.remove();
};

export default removeErrorValidationMessage;
