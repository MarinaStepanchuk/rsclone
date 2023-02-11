import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

class Dashboard extends BasePage {
  public lang: LANG;

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
      classList: [ClassMap.mode[this.modeValue].font],
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

    const incomeWrap = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalIncome,
      content: Dictionary[this.lang].totalIncome,
    });

    const totalIncome = createElement({
      tag: 'div',
      classList: [ ClassMap.dashboard.totalPrice,  ClassMap.mode[this.modeValue].backgroundMenu],
    });

    totalIncome.append(incomeIcon, incomeWrap);

    const outcomeIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    const outcomeWrap = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalOutcome,
      content: Dictionary[this.lang].totalOutcome,
    });

    const totalOutcome = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundMenu],
    });

    totalOutcome.append(outcomeIcon, outcomeWrap);

    const totalFinanceWrap = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.dashboardTotalWrap],
    });

    totalFinanceWrap.append(totalIncome, totalOutcome);

    const mainDashboard = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
      content: 'Тут мэйн',
    });

    mainDashboard.append(dashboardHeader, totalFinanceWrap);

    const mainAside = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
      content: 'Тут aside',
    });

    mainContent?.replaceChildren(mainDashboard, mainAside);
  }
}

export default Dashboard;
