import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';

class Dashboard extends BasePage {
  public render(): void {
    this.createPageStructure(Route.DASHBOARD);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const greetingContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут Dashboard',
    });

    mainContent?.replaceChildren(greetingContainer);
  }
}

export default Dashboard;
