import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';

class Wallet extends BasePage {
  public render(): void {
    this.createPageStructure(Route.WALLET);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const walletContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут wallet',
    });

    mainContent?.replaceChildren(walletContainer);
  }
}

export default Wallet;
