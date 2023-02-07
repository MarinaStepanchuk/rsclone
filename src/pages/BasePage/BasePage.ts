import Footer from '../../components/Footer/Footer';
import createElement from '../../utils/createElement';
import MainMenu from '../../components/MainMenu/MainMenu';

class BasePage {
  private footer: Footer;

  private mainMenu: MainMenu;

  constructor() {
    this.footer = new Footer();
    this.mainMenu = new MainMenu();
  }

  protected getPageStructure(page: string): HTMLElement {
    const main = createElement({
      tag: 'main', classList: ['main'],
    });
    const mainMenu = this.mainMenu.render(page);
    const wrapper = createElement({ tag: 'div' });
    const footer = this.footer.render();

    main.append(mainMenu);
    wrapper.append(main);
    wrapper.append(footer);

    return wrapper;
  }
}

export default BasePage;
