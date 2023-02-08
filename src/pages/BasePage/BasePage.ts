import Footer from '../../components/Footer/Footer';
import createElement from '../../utils/createElement';
import MainMenu from '../../components/MainMenu/MainMenu';
import { ClassMap, ClassNameList } from '../../constants/htmlConstants';

class BasePage {
  private footer: Footer;

  private mainMenu: MainMenu;

  constructor() {
    this.footer = new Footer();
    this.mainMenu = new MainMenu();
  }

  protected createPageStructure(page: string): void {
    const mainSection = document.querySelector(ClassNameList.main);
    const menuBlock = document.querySelector(ClassNameList.mainMenu);
    const footerBlock = document.querySelector(ClassNameList.footer);

    if (mainSection && menuBlock && footerBlock) {
      return;
    }

    const main = createElement({
      tag: 'main',
      classList: [ClassMap.main],
    });
    const mainContent = createElement({
      tag: 'section',
      classList: [ClassMap.mainContent],
    });

    const mainMenu = this.mainMenu.render(page);
    const wrapper = createElement({ tag: 'div' });
    const footer = this.footer.render();

    main.append(mainMenu, mainContent);
    wrapper.append(main);
    wrapper.append(footer);

    document.body.replaceChildren(wrapper);
  }
}

export default BasePage;
