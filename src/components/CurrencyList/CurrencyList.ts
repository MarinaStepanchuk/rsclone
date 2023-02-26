import './CurrencyList.scss'
import createElement from "../../utils/createElement";
import {ClassMap } from "../../constants/htmlConstants";
import {CURRENCY, LANG, MODE} from "../../types/types";
import AppState from "../../constants/appState";
import {LocalStorageKey} from "../../constants/common";
import {Dictionary, DictionaryKeys} from "../../constants/dictionary";

class CurrencyList {
  private modeValue: MODE;

  private lang: LANG;

  private readonly currency: CURRENCY;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
  }

  public render(): HTMLElement {

    const currencyTitle = createElement({
      tag: 'h3',
      key: DictionaryKeys.currencyListTitle,
      content: Dictionary[this.lang].currencyListTitle,
    })

    const currencyList = createElement({
      tag: 'ul',
      classList: [ClassMap.currencyList.currencyList],
    });

    const currencySection = createElement({
      tag: 'section',
      classList: [ClassMap.currencyList.currency, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font]
    });

    currencySection.append(currencyTitle, currencyList);

    return currencySection;
  }
}

export default CurrencyList;
