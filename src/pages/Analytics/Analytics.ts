import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';

class Analytics extends BasePage {
  public render(): void {
    this.createPageStructure(Route.ANALYTICS);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const analyticsContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут analytics',
    });

    mainContent?.replaceChildren(analyticsContainer);
  }
}

export default Analytics;
