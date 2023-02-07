import './Account.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';

class Account extends BasePage {
  public render(): void {
    const basePage = this.getPageStructure(Path.ACCOUNT);

    document.body.replaceChildren(basePage);
  }
}

export default Account;
