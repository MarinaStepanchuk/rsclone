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
      new WalletAccouts().render(),
      new WalletCategories().render()
    );

    mainContent?.replaceChildren(section);
  }
}

export default Wallet;
