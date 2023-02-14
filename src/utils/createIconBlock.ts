import AppState from '../constants/appState';
import { LocalStorageKey } from '../constants/common';
import { Dictionary, DictionaryKeys } from '../constants/dictionary';
import { ClassMap } from '../constants/htmlConstants';
import { SvgIcons } from '../constants/svgMap';
import { IAccount, ICategory } from '../types/interfaces';
import createElement from './createElement';
import { SectionWallet, CurrencyMark } from '../types/enums';
import { CURRENCY } from '../types/types';

const createIconBlock = (data: IAccount | ICategory, type: SectionWallet): HTMLElement => {
  const { lang } = AppState;
  const currency = (JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user).currency as CURRENCY;

  const {
    _id: id, icon, sum, key = '',
  } = data;
  const name = type === SectionWallet.account ? (data as IAccount).account : (data as ICategory).category;

  const item = createElement({
    tag: 'div',
    classList: [ClassMap.wallet.item],
    id: id as string,
  });

  const itemTitle = Dictionary[lang][key] && DictionaryKeys[key]
    ? createElement({
      tag: 'span',
      classList: [ClassMap.wallet.title],
      key: DictionaryKeys[key],
      content: Dictionary[lang][key],
    })
    : createElement({
      tag: 'span',
      classList: [ClassMap.wallet.title],
      content: name,
    });

  const itemIcon = createElement({
    tag: 'div',
    classList: [ClassMap.wallet.image],
  });

  if (type === SectionWallet.category) {
    itemIcon.classList.add(ClassMap.wallet.lightIcon);
  }

  itemIcon.innerHTML = SvgIcons[type][icon] ? SvgIcons[type][icon] : SvgIcons[type].base;

  const itemAmount = createElement({
    tag: 'span',
    classList: [ClassMap.wallet.balance],
    content: `${sum} ${CurrencyMark[currency]}`,
  });

  item.replaceChildren(itemTitle, itemIcon, itemAmount);

  return item;
};

export default createIconBlock;
