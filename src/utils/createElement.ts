import { IOptionsElement } from '../types/interfaces';
import { LANG_ATTRIBUTE } from '../constants/common.constants';

const createElement = ({
  tag = 'div',
  classList,
  content,
  id,
  key,
}: IOptionsElement): HTMLElement => {
  const element = document.createElement(tag);

  if (classList && classList.length > 0) {
    element.classList.add(...classList);
  }

  if (content) {
    element.textContent = content;
  }

  if (id) {
    element.id = id;
  }

  if (key) {
    element.setAttribute('data-lang', LANG_ATTRIBUTE);
    element.setAttribute('key', key);
  }

  return element;
};

export default createElement;
