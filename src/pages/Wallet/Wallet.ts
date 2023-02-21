import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import WalletAccouts from '../../components/WalletAccouts/WalletAccouts';
import WalletCategories from '../../components/WalletCategories/WalletCategories';

class Wallet extends BasePage {
  public async render(): Promise<void> {
    this.createPageStructure(Route.WALLET);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const section = createElement({
      tag: 'section',
      classList: [ClassMap.wallet.wrapper],
    });

    section.append(
      await new WalletAccouts(this.updateAccountsBlock).render(),
      await new WalletCategories(this.updateCategoriesBlock).render(),
    );

    mainContent?.replaceChildren(section);
  }

  private async updateAccountsBlock(): Promise<void> {
    const element = document.querySelector(`.${ClassMap.wallet.accountsSection}`) as HTMLElement;
    element.replaceWith(await new WalletAccouts(this.updateAccountsBlock).render());
  }

  private async updateCategoriesBlock(): Promise<void> {
    const element = document.querySelector(`.${ClassMap.wallet.categoriesSection}`) as HTMLElement;
    element.replaceWith(await new WalletCategories(this.updateCategoriesBlock).render());
  }
}

export default Wallet;
