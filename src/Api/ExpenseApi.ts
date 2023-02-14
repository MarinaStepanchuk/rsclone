import { IExpense, IExpenseUpdate } from '../types/interfaces';
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

  public static async createExpense(token: string, expenseData: IExpense): Promise<IExpense> {
    const url = `${REQUEST_URL.expense}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(expenseData),
      });

      const newExpense = await response.json();

      return newExpense;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async updateExpense(token: string, expenseData: IExpenseUpdate): Promise<IExpense> {
    const url = `${REQUEST_URL.expense}/${expenseData._id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(expenseData),
      });

      const changedExpense = await response.json();

      return changedExpense;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async deleteExpense(token: string, id: string): Promise<void> {
    const url = `${REQUEST_URL.expense}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.DELETE,
        headers: authorization,
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async getExpense(token: string, id: string): Promise<IExpense> {
    const url = `${REQUEST_URL.expense}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: authorization,
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default ExpenseApi;
