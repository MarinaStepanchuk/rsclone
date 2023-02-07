import { IValidation } from '../types/interfaces';
import showErrorValidationMessage from './showErrorValidationMessage';
import removeErrorValidationMessage from './removeErrorValidationMessage';

const checkForValidity = ({
  element,
  regularExpression,
  errorMessage,
}: IValidation): boolean => {
  if (!element.value.match(regularExpression)) {
    showErrorValidationMessage(element, errorMessage);
    return false;
  }

  removeErrorValidationMessage(element);
  return true;
};

export default checkForValidity;
