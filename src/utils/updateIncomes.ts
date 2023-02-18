import { IIncome } from '../types/interfaces';
import AppState from '../constants/appState';
import RequestApi from '../Api/RequestsApi';
import { Endpoint } from '../Api/serverConstants';

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
  return []
}

export default function updateIncomes(totalBalance: HTMLElement, cardBalance: HTMLElement, cashBalance: HTMLElement): void {
  const allIncomes = getAllIncomes();
  allIncomes.then((incomes) => {
    const res = incomes.reduce((acc, curr) => acc + curr.income, 0);
    totalBalance.textContent = `${res}`;

    const cardIncomes = incomes
      .filter((category) => category.account === 'card')
      .reduce((acc, curr) => acc + curr.income, 0);
    cardBalance.textContent = `${cardIncomes}`;

    const cashIncomes = incomes
      .filter((category) => category.account === 'cash')
      .reduce((acc, curr) => acc + curr.income, 0);
    cashBalance.textContent = `${cashIncomes}`;
  });
}
