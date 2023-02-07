import './Account.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';

class Account extends BasePage {
  public render(): void {
    this.createPageStructure(Path.ACCOUNT);
  }
}

export default Account;
