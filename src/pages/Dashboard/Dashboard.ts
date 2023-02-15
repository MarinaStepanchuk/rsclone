import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { SvgIcons } from '../../constants/svgMap';
import MainMenu from '../../components/MainMenu/MainMenu';
import SupportModal from "../../modals/SupportModal/SupportModal";
import IncomeForm from "../../components/IncomeForm/IncomeForm";

class Dashboard extends BasePage {
  public lang: LANG;
  public modeValue: MODE;

  constructor() {
    super();
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(): void {
    this.createPageStructure(Route.DASHBOARD);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);
    const userAccount = localStorage.getItem('auth');

    const userName = createElement({
      tag: 'span',
    });

    if (userAccount) {
      const userAccountObj = JSON.parse(userAccount);
      userName.textContent = userAccountObj.user.username;
    } else {
      userName.textContent = 'user';
    }

    const headerWelcomeTitle = createElement({
      tag: 'h2',
      classList: [ClassMap.dashboard.title, ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.welcomeHeader,
      content: Dictionary[this.lang].welcomeHeader,
    });

    headerWelcomeTitle.append(userName);

    const dashboardHeader = createElement({
      tag: 'header',
    });

    dashboardHeader.append(headerWelcomeTitle);

    const incomeIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    incomeIcon.innerHTML = SvgIcons.dashboard.arrowDown;

    const incomeBalance = createElement( {
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
      content: '111',
    })

    const incomeWrap = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalIncome,
      content: Dictionary[this.lang].totalIncome,
    });

    incomeWrap.append(incomeBalance);

    const totalIncome = createElement({
      tag: 'div',
      classList: [ ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundSection],
    });

    totalIncome.append(incomeIcon, incomeWrap);

    const outcomeIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap, ClassMap.dashboard.iconWrapLight],
    });

    outcomeIcon.innerHTML = SvgIcons.dashboard.arrowUp;

    const outcomeBalance = createElement( {
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
      content: '222',
    })

    const outcomeWrap = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalOutcome,
      content: Dictionary[this.lang].totalOutcome,
    });

    outcomeWrap.append(outcomeBalance);

    const totalOutcome = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundSection],
    });

    totalOutcome.append(outcomeIcon, outcomeWrap);

    const totalFinanceWrap = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.dashboard],
    });

    totalFinanceWrap.append(totalIncome, totalOutcome);

    const cardBalanceIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    cardBalanceIcon.innerHTML = SvgIcons.account.card;

    const cardBalanceValue = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance],
      content: '12345',
    })

    const cardBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.cardBalance,
      content: Dictionary[this.lang].cardBalance,
    })

    cardBalance.append(cardBalanceValue)

    const cardBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalWrap]
    });

    cardBalanceWrap.append(cardBalanceIcon, cardBalance);

    const cashBalanceIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    cashBalanceIcon.innerHTML = SvgIcons.account.cash;

    const cashBalanceValue = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance],
      content: '98765',
    })

    const cashBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.cashBalance,
      content: Dictionary[this.lang].cashBalance,
    })

    cashBalance.append(cashBalanceValue)

    const cashBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalWrap]
    });

    cashBalanceWrap.append(cashBalanceIcon, cashBalance);

    const updateWalletButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.balanceButton, ClassMap.transitionButoon],
      key: DictionaryKeys.updateWalletButton,
      content: Dictionary[this.lang].updateWalletButton,
    }) as HTMLButtonElement;

    updateWalletButton.setAttribute(Attribute.dataLink, Route.WALLET);

    updateWalletButton.addEventListener('click', () => {
      MainMenu.createActiveButton(Route.WALLET);
    });

    const balanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.balanceWrap],
    });

    balanceWrap.append(cardBalanceWrap, cashBalanceWrap, updateWalletButton);

    const addIncomeButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.balanceButton],
      key: DictionaryKeys.addIncome,
      content: Dictionary[this.lang].addIncome,
    }) as HTMLButtonElement;

    addIncomeButton.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new IncomeForm().render();
      section?.append(modal as HTMLElement);
    });

    const addOutcomeButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.balanceButton],
      key: DictionaryKeys.addOutcome,
      content: Dictionary[this.lang].addOutcome,
    }) as HTMLButtonElement;

    const addLimitButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.balanceButton, ClassMap.transitionButoon],
      key: DictionaryKeys.addLimit,
      content: Dictionary[this.lang].addLimit,
    }) as HTMLButtonElement;

    addLimitButton.setAttribute(Attribute.dataLink, Route.WALLET);

    addLimitButton.addEventListener('click', () => {
      MainMenu.createActiveButton(Route.WALLET);
    });

    const buttonsWrap = createElement( {
      tag: 'div',
      classList: [ClassMap.dashboard.balanceWrap],
    })

    buttonsWrap.append(addIncomeButton, addOutcomeButton, addLimitButton)

    const balanceSection = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.balance, ClassMap.mode[this.modeValue].backgroundSection],
    });

    balanceSection.append(balanceWrap, buttonsWrap);

    const mainDashboard = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
    });

    mainDashboard.append(dashboardHeader, totalFinanceWrap, balanceSection);

    const mainAside = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
      content: 'Тут aside',
    });

    mainContent?.replaceChildren(mainDashboard, mainAside);
  }
}

export default Dashboard;
