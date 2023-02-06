import '../../styles/main.scss'
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';

class Dashboard extends BasePage {
  public render(): void {
    const basePage = this.getPageStructure();

    document.body.replaceChildren(basePage);
  }
}

export default Dashboard;
