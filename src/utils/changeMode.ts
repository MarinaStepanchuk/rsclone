// import { LocalStorageKey, Mode } from '../constants/common';
// import { MODE } from '../types/types';
// import { ClassMap } from '../constants/htmlConstants';
// import { ModeItem } from '../types/enums';
// import AppState from '../constants/appState';
// import toggleClassMode from './toogleMode';
//
// export function changeMode(modeValue: string): void {
//   const previosMode = modeValue;
//
//   if (modeValue === Mode.light) {
//     modeValue = Mode.dark as MODE;
//   } else {
//     modeValue = Mode.light as MODE;
//   }
//
//   const backgroundElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].background}`);
//   toggleClassMode(backgroundElements, modeValue, previosMode, ModeItem.background);
//
//   const titleElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].title}`);
//   toggleClassMode(titleElements, modeValue, previosMode, ModeItem.title);
//
//   const fontElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].font}`);
//   toggleClassMode(fontElements, modeValue, previosMode, ModeItem.font);
//
//   const backgroundMenu = document.querySelectorAll(`.${ClassMap.menu.menuSection}`);
//   toggleClassMode(backgroundMenu, modeValue, previosMode, ModeItem.backgroundMenu);
//
//   const icons = document.querySelectorAll(`.${ClassMap.mode[previosMode].icon}`);
//   toggleClassMode(icons, modeValue, previosMode, ModeItem.icon);
//
//   localStorage.setItem(LocalStorageKey.mode, this.modeValue);
//   AppState.modeValue = modeValue;
// }
