import './CurrencyList.scss';
import createElement from '../../utils/createElement';
import { ClassMap, currencyListArray } from '../../constants/htmlConstants';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ICurrency, ICurrencyResponse, ICurrencyResponseRates } from '../../types/interfaces';
import getCurrencies from '../../Api/CurrencyApi';

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
      classList: [ClassMap.currencyList.currencyTitle],
      key: DictionaryKeys.currencyListTitle,
      content: Dictionary[this.lang].currencyListTitle,
    });

    const currencyList = createElement({
      tag: 'ul',
      classList: [ClassMap.currencyList.currencyList],
    });

    getCurrencies().then((currAmount: ICurrencyResponse) => {
      currencyListArray.forEach((item) => {
        const newItem = this.createCurrencyItem(item, currAmount);
        currencyList.append(newItem);
      });
    });

    const currencySection = createElement({
      tag: 'section',
      classList: [ClassMap.currencyList.currency, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font],
    });

    currencySection.append(currencyTitle, currencyList);

    return currencySection;
  }

  private createCurrencyItem(item: ICurrency, currencies: ICurrencyResponse): HTMLElement {
    const currAmount = this.getCurrentCurrency(item.key, currencies);

    const icon = createElement({
      tag: 'div',
    });

    icon.innerHTML = item.icon;

    const amount = createElement({
      tag: 'div',
      content: `${currAmount}`,
    });

    const symbol = createElement({
      tag: 'span',
      content: item.currency,
    });

    const currencyItem = createElement({
      tag: 'li',
      classList: [ClassMap.currencyList.currencyItem],
    });

    currencyItem.append(icon, amount, symbol);

    return currencyItem;
  }

  private getCurrentCurrency(key: string, currAmount: ICurrencyResponse): number {
    const amountValue = currAmount.rates[key as keyof ICurrencyResponseRates];
    return amountValue;
  }
}

export default CurrencyList;
