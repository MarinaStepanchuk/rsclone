import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';

class Wallet extends BasePage {
  public render(): void {
    this.createPageStructure(Path.WALLET);

    const walletContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут wallet',
    });

    this.mainContent?.replaceChildren(walletContainer);
  }
}

export default Wallet;
