import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';

class Analytics extends BasePage {
  public render(): void {
    this.createPageStructure(Path.ANALYTICS);

    const analyticsContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут analytics',
    });

    this.mainContent?.replaceChildren(analyticsContainer);
  }
}

export default Analytics;
