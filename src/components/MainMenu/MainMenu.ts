import '../../styles/main.scss';
import './MainMenu.scss';
import createElement from '../../utils/createElement';
import Path from '../../types/enums';
import {
  Attribute,
  ClassMap,
  ClassNameList,
  ImagePath,
  MenuItem,
  Title,
} from '../../constants/htmlConstants';

class MainMenu {
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
      classList: [ClassMap.menu.menuSection, ClassMap.mode.dark.backgroundMenu, ClassMap.mode.dark.font],
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
      this.getNavItem(Path.DASHBOARD, MenuItem.dashboard, ImagePath.menu.dashboardIcon, currPage),
      this.getNavItem(Path.WALLET, MenuItem.wallet, ImagePath.menu.walletIcon, currPage),
      this.getNavItem(Path.ANALYTICS, MenuItem.analytics, ImagePath.menu.analyticsIcon, currPage),
      this.getNavItem(Path.ACCOUNT, MenuItem.account, ImagePath.menu.accountIcon, currPage),
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

  private getNavItem(url: string, name: string, img: string, currPage: string): HTMLElement {
    const navIcon = createElement({
      tag: 'img',
      classList: [ClassMap.menu.navIcon],
    }) as HTMLImageElement;

    navIcon.src = img;

    const navLink = createElement({
      tag: 'button',
      classList: [ClassMap.menu.navButton, ClassMap.mode.dark.font],
      content: name,
    }) as HTMLButtonElement;

    navLink.setAttribute(Attribute.dataLink, url);

    navLink.addEventListener('click', () => {
      this.createActiveButton(url);
    });

    if (url === currPage) {
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
    buttonModeInputOff.setAttribute(Attribute.checked, Attribute.checked);

    const buttonSpanOff = createElement({
      tag: 'span',
      classList: [ClassMap.menu.switchSpan],
    });

    const buttonModeLabelOff = createElement({
      tag: 'label',
      classList: [ClassMap.menu.switchLabel],
    });

    buttonModeLabelOff.append(buttonModeInputOff, buttonSpanOff);

    const switchWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.menu.switchWrap],
    });

    switchWrapper.append(buttonModeLabelOff);

    return switchWrapper;
  }
}

export default MainMenu;
