import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';

class Analytics extends BasePage {
  public render(): void {
    const basePage = this.getPageStructure(Path.ANALYTICS);

    document.body.replaceChildren(basePage);
  }
}

export default Analytics;
