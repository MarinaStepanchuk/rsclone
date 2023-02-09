import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassNameList } from '../../constants/htmlConstants';

class Wallet extends BasePage {
  public render(): void {
    this.createPageStructure(Path.WALLET);

    const mainContent = document.querySelector(ClassNameList.mainContent);

    const walletContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут wallet',
    });

    mainContent?.replaceChildren(walletContainer);
  }
}

export default Wallet;
