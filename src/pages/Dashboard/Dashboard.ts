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
import IncomeForm from '../../components/IncomeForm/IncomeForm';
import { IIncome } from '../../types/interfaces';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';

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
      tag: 'div',
      classList: [ClassMap.dashboard.title, ClassMap.mode[this.modeValue].font],
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

    const dashboardHeader = createElement({
      tag: 'header',
      classList: [ClassMap.dashboard.header],
    });

    dashboardHeader.append(headerWelcomeTitle, userName);

    const incomeIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    incomeIcon.innerHTML = SvgIcons.dashboard.arrowDown;

    const incomeBalance = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
      content: '',
    });

    const incomeTitle = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalIncome,
      content: Dictionary[this.lang].totalIncome,
    });

    const incomeWrap = createElement({
      tag: 'div',
    });

    incomeWrap.append(incomeTitle, incomeBalance);

    const totalIncome = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundSection],
    });

    totalIncome.append(incomeIcon, incomeWrap);

    const outcomeIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap, ClassMap.dashboard.iconWrapLight],
    });

    outcomeIcon.innerHTML = SvgIcons.dashboard.arrowUp;

    const outcomeBalance = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
      content: '222',
    });

    const outcomeTitle = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalOutcome,
      content: Dictionary[this.lang].totalOutcome,
    });

    const outcomeWrap = createElement({
      tag: 'div',
    });

    outcomeWrap.append(outcomeTitle, outcomeBalance);

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
      content: '',
    });

    const cardBalanceTitle = createElement({
      tag: 'div',
      key: DictionaryKeys.cardBalance,
      content: Dictionary[this.lang].cardBalance,
    });

    const cardBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
    });

    cardBalance.append(cardBalanceTitle, cardBalanceValue);

    const cardBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalWrap],
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
      content: '',
    });

    const cashBalanceTitle = createElement({
      tag: 'div',
      key: DictionaryKeys.cashBalance,
      content: Dictionary[this.lang].cashBalance,
    });

    const cashBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
    });

    cashBalance.append(cashBalanceTitle, cashBalanceValue);

    const cashBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalWrap],
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

    const buttonsWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.balanceWrap],
    });

    buttonsWrap.append(addIncomeButton, addOutcomeButton, addLimitButton);

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

    this.updateIncomes(incomeBalance, cardBalanceValue, cashBalanceValue)

    mainContent?.replaceChildren(mainDashboard, mainAside);
  }

  private updateIncomes(totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement): void {
    const allIncomes = this.getAllIncomes();
    allIncomes.then((incomes) => {
      const res = incomes.reduce((acc, curr) => {return acc + curr.income;}, 0);
      totalBalance.textContent = `${res}`;

      const cardIncomes = incomes
        .filter((category) => category.account === 'card')
        .reduce((acc, curr) => { return acc + curr.income }, 0);
      cardBalance.textContent = `${cardIncomes}`

      const cashIncomes = incomes
        .filter((category) => category.account === 'cash')
        .reduce((acc, curr) => { return acc + curr.income }, 0);
      cashBalance.textContent = `${cashIncomes}`;
    });
  }

  private async getAllIncomes(): Promise<IIncome[]> {
    if (AppState.userAccount) {
      const userToken: string = JSON.parse(AppState.userAccount).token;
      const incomesData: IIncome[] = await RequestApi.getAll(Endpoint.INCOME, userToken);
      return incomesData;
    }

    console.log('error: failed to get all incomes');
    throw new Error();
  }
}

export default Dashboard;
