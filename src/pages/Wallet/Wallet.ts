import '../../styles/main.scss';
import './Wallet.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import WalletAccouts from '../../components/WalletAccouts/WalletAccouts';
import WalletCategories from '../../components/WalletCategories/WalletCategories';

class Wallet extends BasePage {
  public render(): void {
    this.createPageStructure(Route.WALLET);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const section = createElement({
      tag: 'section',
      classList: [ClassMap.wallet.section],
    });

    section.append(
      new WalletAccouts(this.updateAccountsBlock).render(),
      new WalletCategories(this.updateCategoriesBlock).render(),
    );

    mainContent?.replaceChildren(section);
  }

  private updateAccountsBlock(): void {
    const element = document.querySelector(`.${ClassMap.wallet.account.wrapper}`) as HTMLElement;
    element.replaceWith(new WalletAccouts(this.updateAccountsBlock).render());
  }

  private updateCategoriesBlock(): void {
    const element = document.querySelector(`.${ClassMap.wallet.category.wrapper}`) as HTMLElement;
    element.replaceWith(new WalletCategories(this.updateCategoriesBlock).render());
  }
}

export default Wallet;
