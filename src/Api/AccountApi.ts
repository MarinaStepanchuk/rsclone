import { IAccount, IAccountUpdate } from '../types/interfaces';
import {
  REQUEST_URL,
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
} from './serverConstants';

class ExpenseApi {
  public static async createAccount(token: string, accountData: IAccount): Promise<IAccount> {
    const url = `${REQUEST_URL.account}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(accountData),
      });

      const newAccount = await response.json();

      return newAccount;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async updateAccount(token: string, accountData: IAccountUpdate): Promise<IAccount> {
    const url = `${REQUEST_URL.account}/${accountData._id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(accountData),
      });

      const changedAccount = await response.json();

      return changedAccount;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async deleteAccount(token: string, id: string): Promise<void> {
    const url = `${REQUEST_URL.account}/${id}`;
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

  public static async getAccount(token: string, id: string): Promise<IAccount> {
    const url = `${REQUEST_URL.account}/${id}`;
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

  public static async getAccounts(token: string): Promise<IAccount[]> {
    const url = `${REQUEST_URL.account}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      const dataResponse: IAccount[] = await response.json();

      return dataResponse;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default ExpenseApi;
