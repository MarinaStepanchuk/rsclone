import '../../styles/main.scss';
import './AdaptiveMenu.scss';
import createElement from '../../utils/createElement';
import {
  Attribute,
  ClassMap,
  IdMap,
  MenuNavItem,
} from '../../constants/htmlConstants';
import { IMenuItem } from '../../types/interfaces';
import { LANG, MODE } from '../../types/types';
import { toggleClassMode } from '../../utils/toogleMode';
import AppState from '../../constants/appState';
import { LocalStorageKey, Mode } from '../../constants/common';
import { ModeItem, SwitcherSize, Route } from '../../types/enums';
import { SvgMap } from '../../constants/svgMap';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import SupportModal from '../../modals/SupportModal/SupportModal';

class MainMenu {
  private modeValue: MODE;

  private lang: LANG;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(currPage: string): HTMLElement {
    const header = createElement({
      tag: 'div',
      classList: [ClassMap.adaptiveMenu.section],
    });

    const logoWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.logoWrap, ClassMap.mode[this.modeValue].logo],
    });

    const menuContainer = createElement({
      tag: 'div',
      classList: [ClassMap.adaptiveMenu.container],
    });

    const firstLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].modal],
    });
    const secondLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].modal],
    });
    const lastLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].modal],
    });

    menuContainer.append(firstLine, secondLine, lastLine);

    header.append(logoWrapper, menuContainer);

    const navWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navWrap],
    });

    navWrapper.append(
      this.createPageNavWrap(currPage),
      this.createAdditionalMenuWrap(),
    );

    const menuSection = createElement({
      tag: 'section',
      classList: [ClassMap.adaptiveMenu.menuNav, ClassMap.mode[this.modeValue].backgroundSection, ClassMap.mode[this.modeValue].font],
    });

    menuSection.append(
      navWrapper,
      this.createUserWrap(),
    );

    header.append(menuSection);

    menuContainer.addEventListener('click', () => {
      menuSection.classList.toggle(`${ClassMap.adaptiveMenu.menuOpen}`);
      menuContainer.classList.toggle(`${ClassMap.adaptiveMenu.menuOpen}`);
    });

    return header;
  }

  private createPageNavWrap(currPage: string): HTMLElement {
    const navList = createElement({
      tag: 'ul',
      classList: [ClassMap.menu.navList],
    });

    navList.append(
      this.getNavItem(MenuNavItem.dashboard, currPage),
      this.getNavItem(MenuNavItem.wallet, currPage),
      this.getNavItem(MenuNavItem.analytics, currPage),
      this.getNavItem(MenuNavItem.account, currPage),
    );

    return navList;
  }

  private createAdditionalMenuWrap(): HTMLElement {
    const itemIconSupport = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navIcon, ClassMap.mode[this.modeValue].icon],
    });

    itemIconSupport.innerHTML = SvgMap.support;

    const menuItemSupport = createElement({
      tag: 'li',
      classList: [ClassMap.menu.menuItem],
    });

    const labelSupport = createElement({
      tag: 'span',
      key: DictionaryKeys.support,
      content: Dictionary[this.lang].support,
    });

    menuItemSupport.append(itemIconSupport, labelSupport);

    menuItemSupport.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new SupportModal().modalWrapper;
      section?.append(modal as HTMLElement);
    });

    const itemIconMode = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navIcon, ClassMap.mode[this.modeValue].icon],
    });

    itemIconMode.innerHTML = SvgMap.mode;

    const menuItemButtonTheme = createElement({
      tag: 'li',
      classList: [ClassMap.menu.menuItem],
    });

    const labelTheme = createElement({
      tag: 'span',
      key: DictionaryKeys.darkMode,
      content: Dictionary[this.lang].darkMode,
    });

    menuItemButtonTheme.append(itemIconMode, labelTheme, this.createSwitchButton());

    const itemIconLang = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navIcon, ClassMap.mode[this.modeValue].icon],
    });

    itemIconLang.innerHTML = SvgMap.langPlanet;

    const menuItemButtonLang = createElement({
      tag: 'li',
      classList: [ClassMap.menu.menuItem],
    });

    const labelLang = createElement({
      tag: 'span',
      key: DictionaryKeys.language,
      content: Dictionary[this.lang].language,
    });

    const langSwitcher = new LangSwitcher(SwitcherSize.SMALL).render();

    menuItemButtonLang.append(itemIconLang, labelLang, langSwitcher);

    const menuAdditionalList = createElement({
      tag: 'ul',
      classList: [ClassMap.menu.menuList],
    });

    menuAdditionalList.append(menuItemSupport, menuItemButtonTheme, menuItemButtonLang);

    return menuAdditionalList;
  }

  private createUserWrap(): HTMLElement {
    const userImg = createElement({
      tag: 'img',
      id: IdMap.menuUserImg,
    }) as HTMLImageElement;

    if (AppState.userAccount) {
      const userAccountObj = JSON.parse(AppState.userAccount);
      userImg.src = userAccountObj.user.avatar;
    }

    const userIcon = createElement({
      tag: 'div',
      classList: [ClassMap.menu.userImg],
    }) as HTMLImageElement;

    userIcon.append(userImg);

    const userName = createElement({
      tag: 'div',
      id: IdMap.menuUserName,
    });

    if (AppState.userAccount) {
      const userAccountObj = JSON.parse(AppState.userAccount);
      userName.textContent = userAccountObj.user.username;
    }

    const userWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.userWrap],
    });

    userWrapper.append(userIcon, userName);

    const logoutImg = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navIcon, ClassMap.mode[this.modeValue].icon],
    });

    logoutImg.innerHTML = SvgMap.logout;

    const logout = createElement({
      tag: 'button',
      classList: [ClassMap.menu.menuItem, ClassMap.menu.logout, ClassMap.transitionButoon],
    });

    const labelLogout = createElement({
      tag: 'span',
      key: DictionaryKeys.logout,
      content: Dictionary[this.lang].logout,
    });

    logout.append(logoutImg, labelLogout);

    logout.addEventListener('click', () => {
      localStorage.removeItem(LocalStorageKey.auth);
      logout.setAttribute('data-link', Route.MAIN);
    });

    const user = createElement({
      tag: 'div',
      classList: [ClassMap.menu.user],
    });

    user.append(userWrapper, logout);

    return user;
  }

  private getNavItem(item: IMenuItem, currPage: string): HTMLElement {
    const navIcon = createElement({
      tag: 'div',
      classList: [ClassMap.menu.navIcon, ClassMap.mode[this.modeValue].icon],
    });

    navIcon.innerHTML = item.image;

    const navLink = createElement({
      tag: 'button',
      classList: [ClassMap.menu.navButton, ClassMap.mode[this.modeValue].font, ClassMap.transitionButoon],
    }) as HTMLButtonElement;

    const navLabel = createElement({
      tag: 'span',
      key: item.key,
      content: item.name,
    });

    navLink.setAttribute(Attribute.dataLink, item.path);

    navLink.addEventListener('click', () => {
      MainMenu.createActiveButton(item.path);
    });

    if (item.path === currPage) {
      navLink.classList.add(ClassMap.menu.navButtonActive);
    }

    const navItem = createElement({
      tag: 'li',
      classList: [ClassMap.menu.navItem],
    });

    navLink.append(navIcon, navLabel);
    navItem.append(navLink);

    return navItem;
  }

  public static createActiveButton(url: string): void {
    const buttons = document.querySelectorAll(`.${ClassMap.menu.navButton}`);

    buttons.forEach((item) => {
      item.classList.remove(ClassMap.menu.navButtonActive);

      if (item.getAttribute(Attribute.dataLink) === url) {
        item.classList.add(ClassMap.menu.navButtonActive);
      }
    });
  }

  private createSwitchButton(): HTMLElement {
    const buttonModeInputOff = createElement({
      tag: 'input',
      classList: [ClassMap.menu.switchInput],
    }) as HTMLInputElement;

    buttonModeInputOff.type = Attribute.inputCheckbox;
    if (this.modeValue === Mode.dark) {
      buttonModeInputOff.setAttribute(Attribute.checked, Attribute.checked);
    }

    const buttonSpanOff = createElement({
      tag: 'span',
      classList: [ClassMap.menu.switchSpan],
    });

    const buttonModeLabelOff = createElement({
      tag: 'label',
      classList: [ClassMap.menu.switchLabel],
    });

    buttonModeLabelOff.append(buttonModeInputOff, buttonSpanOff);

    buttonModeInputOff.addEventListener('click', () => {
      this.changeMode();
    });

    const switchWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.switchWrap],
    });

    switchWrapper.append(buttonModeLabelOff);

    return switchWrapper;
  }

  public changeMode() {
    const previosMode = this.modeValue;

    if (this.modeValue === Mode.light) {
      this.modeValue = Mode.dark as MODE;
    } else {
      this.modeValue = Mode.light as MODE;
    }

    const backgroundElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].background}`);
    toggleClassMode(backgroundElements, this.modeValue, previosMode, ModeItem.background);

    const titleElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].title}`);
    toggleClassMode(titleElements, this.modeValue, previosMode, ModeItem.title);

    const fontElements = document.querySelectorAll(`.${ClassMap.mode[previosMode].font}`);
    toggleClassMode(fontElements, this.modeValue, previosMode, ModeItem.font);

    const backgroundMenu = document.querySelectorAll(`.${ClassMap.mode[previosMode].backgroundSection}`);
    toggleClassMode(backgroundMenu, this.modeValue, previosMode, ModeItem.backgroundSection);

    const icons = document.querySelectorAll(`.${ClassMap.mode[previosMode].icon}`);
    toggleClassMode(icons, this.modeValue, previosMode, ModeItem.icon);

    const logo = document.querySelectorAll(`.${ClassMap.mode[previosMode].logo}`);
    toggleClassMode(logo, this.modeValue, previosMode, ModeItem.logo);

    const modals = document.querySelectorAll(`.${ClassMap.mode[previosMode].modal}`);
    toggleClassMode(modals, this.modeValue, previosMode, ModeItem.modal);

    localStorage.setItem(LocalStorageKey.mode, this.modeValue);
    AppState.modeValue = this.modeValue;
  }
}

export default MainMenu;
