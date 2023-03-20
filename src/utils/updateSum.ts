import { getAllAccounts, getAllExpenses, getAllIncomes } from './getModalApi';
import { IBalances } from '../types/interfaces';

export async function updateTotalAccountBalance(balances: IBalances): Promise<void> {
  const allAccounts = await getAllAccounts();
  const amount = allAccounts.reduce((acc, curr) => acc + curr.sum, 0);

  const newAccountBalance = balances.totalAccountBalance;
  newAccountBalance.textContent = `${amount}`;
}

export async function updateIncomes(balances: IBalances): Promise<void> {
  const allIncomes = await getAllIncomes();
  const res = allIncomes.reduce((acc, curr) => acc + curr.income, 0);

  await updateTotalAccountBalance(balances);

  const totalIncomes = balances.totalBalance;
  totalIncomes.textContent = `${res}`;
}

export async function updateExpenses(balances: IBalances): Promise<void> {
  const allExpenses = await getAllExpenses();
  const res = allExpenses.reduce((acc, curr) => acc + curr.expense, 0);

  await updateTotalAccountBalance(balances);

  const totalExpenses = balances.totalBalance;
  totalExpenses.textContent = `${res}`;
}
