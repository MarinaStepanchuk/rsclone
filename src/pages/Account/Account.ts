import '../../styles/main.scss';
import './Account.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';

class Account extends BasePage {
  public render(): void {
    this.createPageStructure(Path.ACCOUNT);

    const accountContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут Account',
    });

    this.mainContent?.replaceChildren(accountContainer);
  }
}

export default Account;
