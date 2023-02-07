import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from "../../utils/createElement";

class Wallet extends BasePage {
  public render(): void {
    this.createPageStructure(Path.WALLET);

    const mainContent = document.querySelector('.main__content');

    const greetingContainer = createElement({
      tag: 'div', content: 'Я муркуша'
    })

    mainContent?.replaceChildren(greetingContainer);
  }
}

export default Wallet;
