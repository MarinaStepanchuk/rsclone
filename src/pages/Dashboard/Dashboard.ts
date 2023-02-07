import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import Path from '../../types/enums';
import createElement from "../../utils/createElement";

class Dashboard extends BasePage {
  public render(): void {
    this.createPageStructure(Path.DASHBOARD);

    const mainContent = document.querySelector('.main__content');

    const greetingContainer = createElement({
      tag: 'div', content: 'Я богиня дискотеки'
    })

    mainContent?.replaceChildren(greetingContainer);


  }
}

export default Dashboard;
