import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassNameList } from '../../constants/htmlConstants';

class Dashboard extends BasePage {
  public render(): void {
    this.createPageStructure(Path.DASHBOARD);

    const mainContent = document.querySelector(ClassNameList.mainContent);

    const greetingContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут Dashboard',
    });

    mainContent?.replaceChildren(greetingContainer);
  }
}

export default Dashboard;
