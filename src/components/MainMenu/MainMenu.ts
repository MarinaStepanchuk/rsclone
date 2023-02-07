import '../../styles/main.scss';
import './MainMenu.scss';
import createElement from '../../utils/createElement';
import Path from '../../types/enums';
import imgDashboard from '../../assets/icons/dashboard.svg';
import imgWallet from '../../assets/icons/wallet-icon.svg';
import imgAnalytics from '../../assets/icons/bar-line-icon.svg';
import imgAccount from '../../assets/icons/user-icon.svg';
import imgSupport from '../../assets/icons/help-circle.svg';
import imgDarkMode from '../../assets/icons/moon-01.svg';
import imgUser from '../../assets/icons/user.svg';
import imgLogout from '../../assets/icons/logout.svg';

class MainMenu {
  public render(currPage: string): HTMLElement {
    const logoImg = createElement({
      tag: 'div', classList: ['menu__logo'],
    });

    const logoTitle = createElement({
      tag: 'h1', classList: ['menu__logo-title'], content: 'MAPmoney',
    });

    const logoWrapper = createElement({
      tag: 'div', classList: ['menu__logo-wrap'],
    });

    logoWrapper.append(logoImg, logoTitle);

    const nav = createElement({
      tag: 'ul', classList: ['menu__nav'],
    });

    nav.append(
      this.getNavItem(Path.DASHBOARD, 'Dashboard', imgDashboard, currPage),
      this.getNavItem(Path.WALLET, 'My Wallet', imgWallet, currPage),
      this.getNavItem(Path.ANALYTICS, 'Analytics', imgAnalytics, currPage),
      this.getNavItem(Path.ACCOUNT, 'Account', imgAccount, currPage),
    );

    const itemIconSupport = createElement({
      tag: 'img', classList: ['menu__nav-icon'],
    }) as HTMLImageElement;

    itemIconSupport.src = imgSupport;

    const menuItemSupport = createElement({
      tag: 'li', classList: ['menu__item'], content: 'Support',
    })

    menuItemSupport.prepend(itemIconSupport);

    const itemIconMode = createElement({
      tag: 'img', classList: ['menu__nav-icon'],
    }) as HTMLImageElement;

    itemIconMode.src = imgDarkMode;

    const menuItemButtonTheme = createElement({
      tag: 'li', classList: ['menu__item'], content: 'Dark Mode',
    });

    menuItemButtonTheme.prepend(itemIconMode);
    menuItemButtonTheme.append(this.createSwitchButton());

    const menuAdditionalList = createElement({
      tag: 'ul', classList: ['menu__list'],
    })

    menuAdditionalList.append(menuItemSupport, menuItemButtonTheme);

    const navWrapper = createElement({
      tag: 'div', classList: ['menu__nav-wrap'],
    })

    navWrapper.append(nav, menuAdditionalList);

    const userIcon = createElement({
      tag: 'img',
    }) as HTMLImageElement;

    userIcon.src = imgUser;

    const userName = createElement({
      tag: 'div', content: 'User Name',
    })

    const userWrapper = createElement({
      tag: 'div', classList: ['user__wrap']
    });

    userWrapper.append(userIcon, userName);

    const logoutImg = createElement({
      tag: 'img', classList: ['menu__nav-icon'],
    }) as HTMLImageElement;

    logoutImg.src = imgLogout;

    const logout = createElement({
      tag: 'div', classList: ['menu__item'], content: 'Logout'
    })

    logout.prepend(logoutImg);

    const user = createElement({
      tag: 'div', classList: ['user']
    })

    user.append(userWrapper, logout);

    const menuSection = createElement({
      tag: 'section', classList: ['main__menu'],
    });

    menuSection.append(logoWrapper, navWrapper, user);

    return menuSection;
  }

  private getNavItem(url: string, name: string, img: string, currPage: string): HTMLElement {
    const navIcon = createElement({
      tag: 'img', classList: ['menu__nav-icon'],
    }) as HTMLImageElement;

    navIcon.src = img;

    const navLink = createElement({
      tag: 'button', classList: ['menu__nav-button'], content: name,
    }) as HTMLButtonElement;

    navLink.setAttribute('data-link', url);
    navLink.addEventListener('click', () => {
      this.createActiveButton(url);
    });

    if (url === currPage) {
      navLink.classList.add('menu__nav-button_active');
    }

    const navItem = createElement({
      tag: 'li', classList: ['menu__nav-item'],
    });

    navLink.prepend(navIcon);
    navItem.append(navLink);

    return navItem;
  }

  private createActiveButton(url: string): void {
    const buttons = document.querySelectorAll('.menu__nav-button');
    buttons.forEach((item) => {
      item.classList.remove('menu__nav-button_active');
      if (item.getAttribute('data-link') === url) {
        item.classList.add('menu__nav-button_active');
      }
    });


  }

  private createSwitchButton(): HTMLElement {
    const buttonModeInputOff = createElement({
      tag: 'input', classList: ['menu__input'],
    }) as HTMLInputElement;

    buttonModeInputOff.type = 'checkbox';
    buttonModeInputOff.setAttribute('checked', 'checked');

    const buttonSpanOff = createElement({
      tag: 'span', classList: ['menu__button-span'],
    })

    const buttonModeLabelOff = createElement({
      tag: 'label', classList: ['menu__switch'],
    })

    buttonModeLabelOff.append(buttonModeInputOff, buttonSpanOff);

    const labelWrapper = createElement({
      tag: 'div', classList: ['label-wrap'],
    })

    labelWrapper.append(buttonModeLabelOff);

    return labelWrapper;
  }
}

export default MainMenu;
