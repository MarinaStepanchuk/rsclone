import { IExpense } from '../types/interfaces';
import AppState from '../constants/appState';
import RequestApi from '../Api/RequestsApi';
import { Endpoint } from '../Api/serverConstants';

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

export default function updateExpenses(totalBalance: HTMLElement): void {
  const allOutcomes = getAllExpenses();
  allOutcomes.then((expenses) => {
    const res = expenses.reduce((acc, curr) => acc + curr.expense, 0);
    totalBalance.textContent = `${res}`;
  });
}
