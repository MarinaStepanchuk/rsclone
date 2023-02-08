import '../../styles/main.scss';
import './Account.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassNameList } from '../../constants/htmlConstants';

class Account extends BasePage {
  public render(): void {
    this.createPageStructure(Path.ACCOUNT);

    const mainContent = document.querySelector(ClassNameList.mainContent);

    const accountContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут Account',
    });

    mainContent?.replaceChildren(accountContainer);
  }
}

export default Account;
