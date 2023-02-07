import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';

class Wallet extends BasePage {
  public render(): void {
    const basePage = this.getPageStructure(Path.WALLET);

    document.body.replaceChildren(basePage);
  }
}

export default Wallet;
