import '../../styles/main.scss';
import './MainMenu.scss';
import createElement from '../../utils/createElement';
import SupportModal from '../../modals/SupportModal/SupportModal';
import {
  Attribute,
  ClassMap,
  ClassNameList,
  ImagePath,
  MenuItem, MenuNavItem, Mode,
  Title,
} from '../../constants/htmlConstants';
import { IMenuItem } from '../../types/interfaces';
import { addDarkMode, addLightMode } from '../../utils/toogleMode';
import { LANG, MODE } from '../../types/types';

//! заглушка, язык приходит с файла AppState
const lang: LANG = 'EN';

class MainMenu {
  constructor(private modeValue: MODE) {
  }

  public render(currPage: string): HTMLElement {
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
      classList: [ClassMap.menu.menuSection, ClassMap.mode[this.modeValue].backgroundMenu, ClassMap.mode[this.modeValue].font],
    });

    menuSection.append(
      this.createLogoWrap(),
      navWrapper,
      this.createUserWrap(),
    );

    return menuSection;
  }

  private createLogoWrap(): HTMLElement {
    const logoImg = createElement({
      tag: 'div',
      classList: [ClassMap.menu.logo],
    });

    const logoTitle = createElement({
      tag: 'h1',
      classList: [ClassMap.menu.logoTitle],
      content: Title.logo,
    });

    const logoWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.logoWrap],
    });

    logoWrapper.append(logoImg, logoTitle);

    return logoWrapper;
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
      tag: 'img',
      classList: [ClassMap.menu.navIcon],
    }) as HTMLImageElement;

    itemIconSupport.src = ImagePath.menu.supportIcon;

    const menuItemSupport = createElement({
      tag: 'li',
      classList: [ClassMap.menu.menuItem],
      content: MenuItem.support,
    });

    menuItemSupport.addEventListener('click', () => {
      const section = document.querySelector(ClassNameList.main);
      const modal = new SupportModal(lang, this.modeValue).element;
      section?.append(modal as HTMLElement);
    });

    menuItemSupport.prepend(itemIconSupport);

    const itemIconMode = createElement({
      tag: 'img',
      classList: [ClassMap.menu.navIcon],
    }) as HTMLImageElement;

    itemIconMode.src = ImagePath.menu.darkModeIcon;

    const menuItemButtonTheme = createElement({
      tag: 'li',
      classList: [ClassMap.menu.menuItem],
      content: MenuItem.darkMode,
    });

    menuItemButtonTheme.prepend(itemIconMode);
    menuItemButtonTheme.append(this.createSwitchButton());

    const menuAdditionalList = createElement({
      tag: 'ul',
      classList: [ClassMap.menu.menuList],
    });

    menuAdditionalList.append(menuItemSupport, menuItemButtonTheme);

    return menuAdditionalList;
  }

  private createUserWrap(): HTMLElement {
    const userImg = createElement({ tag: 'img' }) as HTMLImageElement;
    const userAccount = localStorage.getItem('auth');

    if (userAccount) {
      const userAccountObj = JSON.parse(userAccount);
      userImg.src = userAccountObj.user.avatar;
    }

    const userIcon = createElement({
      tag: 'div',
      classList: [ClassMap.menu.userImg],
    }) as HTMLImageElement;

    userIcon.append(userImg);

    const userName = createElement({
      tag: 'div',
    });

    if (userAccount) {
      const userAccountObj = JSON.parse(userAccount);
      userName.textContent = userAccountObj.user.username;
    }

    const userWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.userWrap],
    });

    userWrapper.append(userIcon, userName);

    const logoutImg = createElement({
      tag: 'img',
      classList: [ClassMap.menu.navIcon],
    }) as HTMLImageElement;

    logoutImg.src = ImagePath.menu.logoutIcon;

    const logout = createElement({
      tag: 'div',
      classList: [ClassMap.menu.menuItem],
      content: MenuItem.logout,
    });

    logout.prepend(logoutImg);

    const user = createElement({
      tag: 'div',
      classList: [ClassMap.menu.user],
    });

    user.append(userWrapper, logout);

    return user;
  }

  private getNavItem(item: IMenuItem, currPage: string): HTMLElement {
    const navIcon = createElement({
      tag: 'img',
      classList: [ClassMap.menu.navIcon],
    }) as HTMLImageElement;

    navIcon.src = item.image;

    const navLink = createElement({
      tag: 'button',
      classList: [ClassMap.menu.navButton, ClassMap.mode[this.modeValue].font],
      content: item.name,
    }) as HTMLButtonElement;

    navLink.setAttribute(Attribute.dataLink, item.path);

    navLink.addEventListener('click', () => {
      this.createActiveButton(item.path);
    });

    if (item.path === currPage) {
      navLink.classList.add(ClassMap.menu.navButtonActive);
    }

    const navItem = createElement({
      tag: 'li',
      classList: [ClassMap.menu.navItem],
    });

    navLink.prepend(navIcon);
    navItem.append(navLink);

    return navItem;
  }

  private createActiveButton(url: string): void {
    const buttons = document.querySelectorAll(ClassNameList.menu.navButton);

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
    if (this.modeValue === Mode.darkValue) {
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
    if (this.modeValue === Mode.lightValue) {
      const backgroundElements = document.querySelectorAll(`.${ClassMap.mode.light.background}`);
      addDarkMode(backgroundElements, 'background');

      const backgroundMenu = document.querySelector(ClassNameList.mainMenu);
      backgroundMenu?.classList.remove(ClassMap.mode.light.backgroundMenu);
      backgroundMenu?.classList.add(ClassMap.mode.dark.backgroundMenu);

      const titleElements = document.querySelectorAll(`.${ClassMap.mode.light.title}`);
      addDarkMode(titleElements, 'title');

      const fontElements = document.querySelectorAll(`.${ClassMap.mode.light.font}`);
      addDarkMode(fontElements, 'font');

      this.modeValue = Mode.darkValue as MODE;
    } else {
      const backgroundElements = document.querySelectorAll(`.${ClassMap.mode.dark.background}`);
      addLightMode(backgroundElements, 'background');

      const backgroundMenu = document.querySelector(ClassNameList.mainMenu);
      backgroundMenu?.classList.remove(ClassMap.mode.dark.backgroundMenu);
      backgroundMenu?.classList.add(ClassMap.mode.light.backgroundMenu);

      const titleElements = document.querySelectorAll(`.${ClassMap.mode.dark.title}`);
      addLightMode(titleElements, 'title');

      const fontElements = document.querySelectorAll(`.${ClassMap.mode.dark.font}`);
      addLightMode(fontElements, 'font');

      this.modeValue = Mode.lightValue as MODE;
    }
    localStorage.setItem(Mode.key, this.modeValue);
  }
}

export default MainMenu;
