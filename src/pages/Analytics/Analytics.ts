import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassNameList } from '../../constants/htmlConstants';

class Analytics extends BasePage {
  public render(): void {
    this.createPageStructure(Path.ANALYTICS);

    const mainContent = document.querySelector(ClassNameList.mainContent);

    const analyticsContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут analytics',
    });

    mainContent?.replaceChildren(analyticsContainer);
  }
}

export default Analytics;
