import { getAllAccounts, getAllExpenses, getAllIncomes } from './getModalApi';
import { IBalances } from '../types/interfaces';

export async function updateBalances(balances: IBalances): Promise<void> {
  const allAccounts = await getAllAccounts();

  const cardAccount = allAccounts
    .filter((account) => account.key === 'card')
    .pop();

  const newCardBalance = balances.cardBalance;
  newCardBalance.textContent = `${cardAccount?.sum}`;

  const cashAccount = allAccounts
    .filter((account) => account.key === 'cash')
    .pop();

  const newCashBalance = balances.cashBalance;
  newCashBalance.textContent = `${cashAccount?.sum}`;
}

export async function updateIncomes(balances: IBalances): Promise<void> {
  const allIncomes = await getAllIncomes();
  const res = allIncomes.reduce((acc, curr) => acc + curr.income, 0);

  await updateBalances(balances);

  const totalIncomes = balances.totalBalance;
  totalIncomes.textContent = `${res}`;
}

export async function updateExpenses(balances: IBalances): Promise<void> {
  const allExpenses = await getAllExpenses();
  const res = allExpenses.reduce((acc, curr) => acc + curr.expense, 0);

  await updateBalances(balances);

  const totalExpenses = balances.totalBalance;
  totalExpenses.textContent = `${res}`;
}
