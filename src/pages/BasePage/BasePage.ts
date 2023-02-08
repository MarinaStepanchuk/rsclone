import Footer from '../../components/Footer/Footer';
import createElement from '../../utils/createElement';
import MainMenu from '../../components/MainMenu/MainMenu';
import { ClassMap, ClassNameList } from '../../constants/htmlConstants';

class BasePage {
  private footer: Footer;

  private mainMenu: MainMenu;

  protected mainContent: HTMLElement | null = null;

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
      classList: [ClassMap.main, ClassMap.mode.dark.background],
    });

    this.mainContent = createElement({
      tag: 'section',
      classList: [ClassMap.mainContent],
    });

    const mainMenu = this.mainMenu.render(page);
    const footer = this.footer.render();

    main.append(mainMenu, this.mainContent);

    document.body.replaceChildren(main, footer);
  }
}

export default BasePage;
