import { IAccount, IExpense, IIncome } from '../types/interfaces';
import AppState from '../constants/appState';
import RequestApi from '../Api/RequestsApi';
import { Endpoint } from '../Api/serverConstants';
import { LocalStorageKey } from '../constants/common';

async function getAllIncomes(): Promise<IIncome[]> {
  if (AppState.userAccount) {
    const userToken: string = JSON.parse(AppState.userAccount).token;

    try {
      const incomesData: IIncome[] = await RequestApi.getAll(Endpoint.INCOME, userToken);
      return incomesData;
    } catch (e) {
      console.log('error: failed to get all incomes');
    }
  }
  return [];
}

async function getAllExpenses(): Promise<IExpense[]> {
  if (AppState.userAccount) {
    const userToken: string = JSON.parse(AppState.userAccount).token;

    try {
      const expensesData: IExpense[] = await RequestApi.getAll(Endpoint.EXPENSE, userToken);
      return expensesData;
    } catch (e) {
      console.log('error: failed to get all expenses');
    }
  }
  return [];
}

async function getAllAccounts(): Promise<IAccount[]> {
  const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
  const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
  console.log(accountsData);
  return accountsData;
}

export function updateBalances(cardBalanceValue: HTMLElement, cashBalanceValue: HTMLElement): void {
  const allAccounts = getAllAccounts();

  allAccounts.then((accounts) => {
    console.log(accounts);
    const cardAccount = accounts
      .filter((account) => account.key === 'card')
      .pop();

    console.log(cardAccount);
    console.log(cardAccount?.sum);

    cardBalanceValue.textContent = `${cardAccount?.sum}`;

    const cashAccount = accounts
      .filter((account) => account.key === 'cash')
      .pop();

    cashBalanceValue.textContent = `${cashAccount?.sum}`;
  });
  // const allIncomes = getAllIncomes();
//   allIncomes.then((incomes) => {
//     const res = incomes.reduce((acc, curr) => acc + curr.income, 0);
//     totalBalance.textContent = `${res}`;
//
//     const cardIncomes = incomes
//       .filter((category) => category.account === 'card')
//       .reduce((acc, curr) => acc + curr.income, 0);
//     console.log(cardIncomes);
//     cardBalance.textContent = `${cardIncomes}`;
//
//     const cashIncomes = incomes
//       .filter((category) => category.account === 'cash')
//       .reduce((acc, curr) => acc + curr.income, 0);
//     console.log(cashIncomes);
//     cashBalance.textContent = `${cashIncomes}`;
//   });
}

export function updateIncomes(incomeBalance: HTMLElement): void {
  const allIncomes = getAllIncomes();

  allIncomes.then((incomes) => {
    const res = incomes.reduce((acc, curr) => acc + curr.income, 0);
    incomeBalance.textContent = `${res}`;
  });
}

export function updateExpenses(expenseBalance: HTMLElement): void {
  const allExpenses = getAllExpenses();

  allExpenses.then((expenses) => {
    const res = expenses.reduce((acc, curr) => acc + curr.expense, 0);
    expenseBalance.textContent = `${res}`;
  });
}
