import './WalletPeriodSelect.scss';
import createElement from '../../utils/createElement';
import { Attribute, ClassMap, ellementId } from '../../constants/htmlConstants';
import { LANG, MODE, CURRENCY } from '../../types/types';
import AppState from '../../constants/appState';
import { LocalStorageKey } from '../../constants/common';
import { CurrencyMark, SectionWallet } from '../../types/enums';
import { SvgIcons } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import CreatorCategory from '../../modals/CreatorCategory/CreatorCategory';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { ICategory, IExpense, IFilterParams } from '../../types/interfaces';
import CustomSelect from '../СustomSelect/СustomSelect';

class WalletPeriodSelect {
  private modeValue: MODE;

  private lang: LANG;

  constructor(private fillBlock: (start: string, end: string) => Promise<void>, private countAmount: () => void) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(): HTMLElement {
    const select = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.select, ClassMap.customSelect.container],
      id: ellementId.walletSelect,
    });

    const selectButton = createElement({
      tag: 'button',
      classList: [ClassMap.customSelect.title],
      key: DictionaryKeys.walletPeriodCurrentMonth,
      content: Dictionary[this.lang].walletPeriodCurrentMonth,
    });

    const selectList = createElement({
      tag: 'ul',
    });

    const selectCurrentMonth = createElement({
      tag: 'li',
      key: DictionaryKeys.walletPeriodCurrentMonth,
      content: Dictionary[this.lang].walletPeriodCurrentMonth,
    });

    const selectYear = createElement({
      tag: 'li',
      key: DictionaryKeys.walletPeriodYear,
      content: Dictionary[this.lang].walletPeriodYear,
    });

    const selectMonth = createElement({
      tag: 'li',
      key: DictionaryKeys.walletPeriodMonth,
      content: Dictionary[this.lang].walletPeriodMonth,
    });

    selectList.append(selectCurrentMonth, selectYear, selectMonth);

    const arrow = createElement({
      tag: 'div',
      classList: [ClassMap.customSelect.arrow],
    });

    const arrowLeft = createElement({
      tag: 'span',
      classList: [ClassMap.customSelect.arrowLeft],
    });

    const arrowRight = createElement({
      tag: 'span',
      classList: [ClassMap.customSelect.arrowRight],
    });

    arrow.append(arrowLeft, arrowRight);

    select.append(arrow, selectButton, selectList);

    const walletSelect = new CustomSelect(select, ClassMap.customSelect.title);

    document.addEventListener('select', (event) => {
      const customEvent = event as CustomEvent;

      // const button = document.querySelector(`.${ClassMap.customSelect.title}`) as HTMLElement;
      selectButton.setAttribute(Attribute.key, customEvent.detail.key);
      console.log(customEvent.detail.key);
      console.log(customEvent.detail.title);
    });

    return select;
  }
}

export default WalletPeriodSelect;
