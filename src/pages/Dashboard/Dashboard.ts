import '../../styles/main.scss';
import './Dashboard.scss';
import BasePage from '../BasePage/BasePage';
import { CurrencyMark, Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { CURRENCY, LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { SvgIcons } from '../../constants/svgMap';
import MainMenu from '../../components/MainMenu/MainMenu';
import IncomeModal from '../../modals/IncomeModal/IncomeModal';
import { LocalStorageKey } from '../../constants/common';
import ExpenseModal from '../../modals/ExpenseModal/ExpenseModal';
import {updateExpenseList, updateExpenses, updateIncomes} from '../../utils/updateSum';
import { IBalances } from '../../types/interfaces';
import Calculator from '../../components/Сalculator/Сalculator';
import ExpenseList from "../../components/ExpenseList/ExpenseList";

class Dashboard extends BasePage {
  public lang: LANG;

  public modeValue: MODE;

  public currency: CURRENCY;

  constructor() {
    super();
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
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
      content: '0',
    });

    const incomeBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
    });

    incomeBalanceWrap.append(incomeBalance, this.addCurrency());

    const incomeTitle = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalIncome,
      content: Dictionary[this.lang].totalIncome,
    });

    const incomeWrap = createElement({
      tag: 'div',
    });

    incomeWrap.append(incomeTitle, incomeBalanceWrap);

    const totalIncome = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundSection],
    });

    totalIncome.append(incomeIcon, incomeWrap);

    const expenseIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap, ClassMap.dashboard.iconWrapLight],
    });

    expenseIcon.innerHTML = SvgIcons.dashboard.arrowUp;

    const expenseBalance = createElement({
      tag: 'div',
      content: '0',
    });

    const expenseBalanceWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
    });

    expenseBalanceWrap.append(expenseBalance, this.addCurrency());

    const expenseTitle = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
      key: DictionaryKeys.totalExpense,
      content: Dictionary[this.lang].totalExpense,
    });

    const expenseWrap = createElement({
      tag: 'div',
    });

    expenseWrap.append(expenseTitle, expenseBalanceWrap);

    const totalExpense = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalPrice, ClassMap.mode[this.modeValue].backgroundSection],
    });

    totalExpense.append(expenseIcon, expenseWrap);

    const totalFinanceWrap = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.dashboard],
    });

    totalFinanceWrap.append(totalIncome, totalExpense);

    const cardBalanceIcon = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.iconWrap],
    });

    cardBalanceIcon.innerHTML = SvgIcons.account.card;

    const cardBalanceValue = createElement({
      tag: 'div',
      content: '0',
    });

    const cardBalanceValueWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
    });

    cardBalanceValueWrap.append(cardBalanceValue, this.addCurrency());

    const cardBalanceTitle = createElement({
      tag: 'div',
      key: DictionaryKeys.cardBalance,
      content: Dictionary[this.lang].cardBalance,
    });

    const cardBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
    });

    cardBalance.append(cardBalanceTitle, cardBalanceValueWrap);

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
      content: '0',
    });

    const cashBalanceValueWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.totalBalance, ClassMap.mode[this.modeValue].font],
    });

    cashBalanceValueWrap.append(cashBalanceValue, this.addCurrency());

    const cashBalanceTitle = createElement({
      tag: 'div',
      key: DictionaryKeys.cashBalance,
      content: Dictionary[this.lang].cashBalance,
    });

    const cashBalance = createElement({
      tag: 'div',
      classList: [ClassMap.mode[this.modeValue].font],
    });

    cashBalance.append(cashBalanceTitle, cashBalanceValueWrap);

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

    const incomeBalances: IBalances = {
      totalBalance: incomeBalance,
      cardBalance: cardBalanceValue,
      cashBalance: cashBalanceValue,
    };

    addIncomeButton.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new IncomeModal().render(incomeBalances);
      section?.append(modal as HTMLElement);
    });

    const addExpenseButton = createElement({
      tag: 'button',
      classList: [ClassMap.dashboard.balanceButton],
      key: DictionaryKeys.addExpense,
      content: Dictionary[this.lang].addExpense,
    }) as HTMLButtonElement;

    const expenseBalances: IBalances = {
      totalBalance: expenseBalance,
      cardBalance: cardBalanceValue,
      cashBalance: cashBalanceValue,
    };

    addExpenseButton.addEventListener('click', () => {
      const section = document.querySelector(`.${ClassMap.main}`);
      const modal = new ExpenseModal().render(expenseBalances);
      section?.append(modal as HTMLElement);
    });

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

    buttonsWrap.append(addIncomeButton, addExpenseButton, addLimitButton);

    const balanceSection = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.balance, ClassMap.mode[this.modeValue].backgroundSection],
    });

    balanceSection.append(balanceWrap, buttonsWrap);

    const expenseList = new ExpenseList().render();

    const mainDashboard = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainDashboard],
    });

    mainDashboard.append(dashboardHeader, totalFinanceWrap, balanceSection, expenseList);

    const calculator = new Calculator().render();

    const calculatorWrap = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.calculatorWrap, ClassMap.mode[this.modeValue].backgroundSection],
    });

    calculatorWrap.append(calculator);

    const mainAside = createElement({
      tag: 'section',
      classList: [ClassMap.dashboard.mainAside],
      content: 'Тут aside',
    });

    mainAside.append(calculatorWrap);

    updateIncomes(incomeBalances);
    updateExpenses(expenseBalances);

    const mainDashboardWrap = createElement({
      tag: 'div',
      classList: [ClassMap.dashboard.mainDashboardWrap],
    });

    mainDashboardWrap.append(mainDashboard, mainAside);

    mainContent?.replaceChildren(mainDashboardWrap);
  }

  private addCurrency(): HTMLElement {
    const currency = createElement({
      tag: 'span',
      content: `${CurrencyMark[this.currency]}`,
    });

    return currency;
  }
}

export default Dashboard;
