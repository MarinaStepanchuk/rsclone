import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';

class Dashboard extends BasePage {
  public render(): void {
    const basePage = this.getPageStructure(Path.DASHBOARD);

    document.body.replaceChildren(basePage);
  }
}

export default Dashboard;
