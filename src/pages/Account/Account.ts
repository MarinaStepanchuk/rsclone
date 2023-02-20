import './Account.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import Calendar from '../../components/Calendar/Calendar';
import AppState from '../../constants/appState';

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

    const calendar = new Calendar(accountContainer);
    calendar.init();
    (calendar.calendarInput as HTMLInputElement).addEventListener('input', () => {
      console.log(AppState.startDate);
      console.log(AppState.endDate);
    });
  }
}

export default Account;
