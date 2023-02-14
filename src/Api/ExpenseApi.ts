import { IExpense } from '../types/interfaces';
import {
  REQUEST_URL,
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
} from './serverConstants';

class ExpenseApi {
  public static async getExpenses(token: string): Promise<IExpense[]> {
    const url = `${REQUEST_URL.expense}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      const dataResponse: IExpense[] = await response.json();

      return dataResponse;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default ExpenseApi;
