import {IAccount, ICategory} from "../types/interfaces";
import {LocalStorageKey} from "../constants/common";
import RequestApi from "../Api/RequestsApi";
import {Endpoint} from "../Api/serverConstants";

export async function getAllAccounts(): Promise<IAccount[]> {
  const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
  const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);

  return accountsData;
}

export async function getAllCategories(): Promise<ICategory[]> {
  const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
  const accountsData: ICategory[] = await RequestApi.getAll(Endpoint.CATEGORY, userToken);

  return accountsData;
}

// async function getAllIncomes(): Promise<IIncome[]> {
//   if (AppState.userAccount) {
//     const userToken: string = JSON.parse(AppState.userAccount).token;
//
//     try {
//       const incomesData: IIncome[] = await RequestApi.getAll(Endpoint.INCOME, userToken);
//       return incomesData;
//     } catch (e) {
//       console.log('error: failed to get all incomes');
//     }
//   }
//   return [];
// }
//
// async function getAllExpenses(): Promise<IExpense[]> {
//   if (AppState.userAccount) {
//     const userToken: string = JSON.parse(AppState.userAccount).token;
//
//     try {
//       const expensesData: IExpense[] = await RequestApi.getAll(Endpoint.EXPENSE, userToken);
//       return expensesData;
//     } catch (e) {
//       console.log('error: failed to get all expenses');
//     }
//   }
//   return [];
// }
