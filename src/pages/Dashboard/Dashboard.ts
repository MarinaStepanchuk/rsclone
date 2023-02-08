import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';

class Dashboard extends BasePage {
  public render(): void {
    this.createPageStructure(Path.DASHBOARD);

    const greetingContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут Dashboard',
    });

    this.mainContent?.replaceChildren(greetingContainer);
  }
}

export default Dashboard;
