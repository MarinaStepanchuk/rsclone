import Footer from '../../components/Footer/Footer';
import createElement from '../../utils/createElement';
import MainMenu from '../../components/MainMenu/MainMenu';
import { ClassMap, ClassNameList, Mode } from '../../constants/htmlConstants';
import { MODE } from '../../types/types';

class BasePage {
  private footer: Footer;

  private mainMenu: MainMenu;

  private modeValue: MODE;

  constructor() {
    this.modeValue = (!localStorage.getItem(Mode.key) ? Mode.lightValue : localStorage.getItem(Mode.key)) as MODE;
    this.footer = new Footer(this.modeValue);
    this.mainMenu = new MainMenu(this.modeValue);
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
      classList: [ClassMap.main, ClassMap.mode[this.modeValue].background],
    });

    const mainContent = createElement({
      tag: 'section',
      classList: [ClassMap.mainContent],
    });

    const mainMenu = this.mainMenu.render(page);
    const footer = this.footer.render();

    main.append(mainMenu, mainContent);

    document.body.replaceChildren(main, footer);
  }
}

export default BasePage;
