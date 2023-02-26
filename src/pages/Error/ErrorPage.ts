import './ErrorPage.scss';
import AppState from '../../constants/appState';
import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE } from '../../types/types';
import createElement from '../../utils/createElement';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { Route } from '../../types/enums';

class ErrorPage {
  private lang: LANG;

  private modeValue: MODE;

  constructor() {
    this.lang = AppState.lang;
    this.modeValue = AppState.modeValue;
  }

  public render(): void {
    const main = createElement({
      tag: 'main',
      classList: [ClassMap.errorPage.main, ClassMap.mode[this.modeValue].background],
    });

    const img = createElement({
      tag: 'div',
      classList: [ClassMap.errorPage.img],
    });

    const button = createElement({
      tag: 'button',
      classList: [ClassMap.errorPage.button, ClassMap.transitionButoon],
      key: DictionaryKeys.backToHomePage,
      content: Dictionary[this.lang].backToHomePage,
    });

    button.setAttribute(Attribute.dataLink, Route.DASHBOARD);

    main.append(img, button);

    document.body.replaceChildren(main);
  }
}

export default ErrorPage;
