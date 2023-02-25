import './Account.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';

class Account extends BasePage {
  public render(): void {
    this.createPageStructure(Route.ACCOUNT);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const accountContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: '',
    });

    mainContent?.replaceChildren(accountContainer);
  }
}

export default Account;
