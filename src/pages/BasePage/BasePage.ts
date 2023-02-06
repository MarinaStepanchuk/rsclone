import Footer from '../../components/Footer/Footer';
import createElement from '../../utils/createElement';

class BasePage {
  private footer: Footer;

  constructor() {
    this.footer = new Footer();
  }

  protected getPageStructure(): HTMLElement {
    const main = createElement({ tag: 'main' });
    const wrapper = createElement({ tag: 'div' });
    const footer = this.footer.render();

    wrapper.append(main);
    wrapper.append(footer);

    return wrapper;
  }
}

export default BasePage;
