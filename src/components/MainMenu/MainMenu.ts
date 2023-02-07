import '../../styles/main.scss';
import './MainMenu.scss';
import createElement from '../../utils/createElement';
import Path from '../../types/enums';
import imgDashboard from '../../assets/icons/dashboard.svg';
import imgWallet from '../../assets/icons/wallet-icon.svg';
import imgAnalytics from '../../assets/icons/bar-line-icon.svg';
import imgAccount from '../../assets/icons/user-icon.svg';

class MainMenu {
  public render(currPage: string): HTMLElement {
    const logoImg = createElement({
      tag: 'div', classList: ['menu__logo'],
    });

    const logoTitle = createElement({
      tag: 'h1', classList: ['menu__logo-title'], content: 'MAPMONEY',
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

    const userWrapper = createElement({
      tag: 'div',
    });

    const menuSection = createElement({
      tag: 'section', classList: ['main__menu'],
    });

    menuSection.append(logoWrapper, nav, userWrapper);

    return menuSection;
  }

  private getNavItem(url: string, name: string, img: string, currPage: string): HTMLElement {
    const navIcon = createElement({
      tag: 'img', classList: ['menu__nav-icon'],
    }) as HTMLImageElement;

    navIcon.src = img;

    const navLink = createElement({
      tag: 'a', classList: ['menu__nav-link'], content: name,
    }) as HTMLLinkElement;

    navLink.href = url;
    navLink.setAttribute('data-link', url);

    if (url === currPage) {
      navLink.classList.add('menu__nav-link_active');
    }

    const navItem = createElement({
      tag: 'li', classList: ['menu__nav-item'],
    });

    navLink.prepend(navIcon);
    navItem.append(navLink);

    return navItem;
  }

  private addActivePageLink(): void {
  }
}

export default MainMenu;

// <ul>
// <li>
//     <a href="#support">Support</a>
//     </li>
//     <li>Dark Mode
// <button>Кнопка переключения тем</button>
// </li>
// </ul>
// <div style="display: flex; align-items: center; justify-content: space-between">
// <div style="display: flex; align-items: center; width: 60px; height: 60px; border-radius: 50%; background: aqua;">Avatar</div>
//     <div>Name</div>
//     <button>Log out</button>
// </div>
// </section>
