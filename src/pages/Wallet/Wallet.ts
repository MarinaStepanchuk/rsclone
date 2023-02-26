import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import WalletAccouts from '../../components/WalletAccouts/WalletAccouts';
import WalletCategories from '../../components/WalletCategories/WalletCategories';
import ChartCategoriesPie from '../../components/ChartCategoriesPie/ChartCategoriesPie';

class Wallet extends BasePage {
  public async render(): Promise<void> {
    this.createPageStructure(Route.WALLET);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const sectionIcons = createElement({
      tag: 'section',
      classList: [ClassMap.wallet.wrapper],
    });

    sectionIcons.append(
      await new WalletAccouts(this.updateAccountsBlock).render(),
      await new WalletCategories(this.updateCategoriesBlock, this.updateAccountsBlock).render(),
    );

    const sectionChart = createElement({
      tag: 'section',
      classList: [ClassMap.wallet.chart],
    });

    const defaultStartDate = new Date(new Date().setDate(1));
    const defaultEndDate = new Date();
    const chart = new ChartCategoriesPie(defaultStartDate, defaultEndDate);

    sectionChart.append(await chart.render());

    const walletPage = createElement({
      tag: 'div',
      classList: [ClassMap.wallet.main],
    });

    walletPage.replaceChildren(sectionIcons, sectionChart);

    mainContent?.replaceChildren(walletPage);

    chart.addChart();
  }

  private async updateAccountsBlock(): Promise<void> {
    const element = document.querySelector(`.${ClassMap.wallet.accountsSection}`) as HTMLElement;
    element.replaceWith(await new WalletAccouts(this.updateAccountsBlock).render());
  }

  private async updateCategoriesBlock(): Promise<void> {
    const element = document.querySelector(`.${ClassMap.wallet.categoriesSection}`) as HTMLElement;
    element.replaceWith(await new WalletCategories(this.updateCategoriesBlock, this.updateAccountsBlock).render());
  }
}

export default Wallet;
