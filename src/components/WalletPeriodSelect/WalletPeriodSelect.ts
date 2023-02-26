import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import { LANG } from '../../types/types';
import AppState from '../../constants/appState';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import CustomSelect from '../СustomSelect/СustomSelect';

class WalletPeriodSelect {
  private lang: LANG;

  constructor() {
    this.lang = AppState.lang;
  }

  public render(): HTMLElement {
    const select = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.select, ClassMap.customSelect.container],
      id: IdMap.walletSelect,
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

    return select;
  }
}

export default WalletPeriodSelect;
