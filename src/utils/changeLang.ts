import { Dictionary } from '../constants/dictionary';
import { LANG } from '../types/types';

const changeLang = async (lang: LANG) => {
  const elements = document.querySelectorAll('[data-lang="lang"]');
  elements.forEach((item) => {
    const element = item as HTMLElement;
    const key = element.getAttribute('key') as string;
    element.innerText = Dictionary[lang][key];
  });
};

export default changeLang;
