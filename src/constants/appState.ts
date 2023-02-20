import { IApplicationState } from '../types/interfaces';
import { LANG, MODE } from '../types/types';
import {
  LocalStorageKey,
  defaultState,
  minRangeDate,
  todayDate,
} from './common';

const AppState: IApplicationState = {
  isUserLogin: false,
  modeValue: (!localStorage.getItem(LocalStorageKey.mode) ? defaultState.mode : localStorage.getItem(LocalStorageKey.mode)) as MODE,
  lang: (!localStorage.getItem(LocalStorageKey.lang) ? defaultState.lang : localStorage.getItem(LocalStorageKey.lang)) as LANG,
  userAccount: (!localStorage.getItem(LocalStorageKey.auth)) ? null : localStorage.getItem(LocalStorageKey.auth),
  startDate: minRangeDate,
  endDate: todayDate,
};

export default AppState;
