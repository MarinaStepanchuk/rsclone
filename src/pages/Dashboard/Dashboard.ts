import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { SvgIcons } from '../../constants/svgMap';

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

    const balanceWrap = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.balanceWrap],
    });

    const mainDashboard = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
    });

    mainDashboard.append(dashboardHeader, totalFinanceWrap, balanceWrap);

    const mainAside = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
      content: 'Тут aside',
    });

    mainContent?.replaceChildren(mainDashboard, mainAside);
  }
}

export default Dashboard;
