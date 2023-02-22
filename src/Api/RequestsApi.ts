import AlertMessage from '../components/AlertMessage/AlertMessege';
import AppState from '../constants/appState';
import { alertTimeout } from '../constants/common';
import { Dictionary } from '../constants/dictionary';
import { IFilterParams } from '../types/interfaces';
import {
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
  Endpoint,
  BASE_URL,
  RESPONSE_STATUS,
} from './serverConstants';

class RequestApi {
  public static async create<T>(endpoint: Endpoint, token: string, data: T): Promise<T | null> {
    const url = `${BASE_URL}${endpoint}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return result;
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async update<T>(endpoint: Endpoint, token: string, id: string, data: Partial<T>): Promise<T | null> {
    const url = `${BASE_URL}${endpoint}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return result;
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async updateSum<T>(endpoint: Endpoint, token: string, id: string, data: { updateSum: number }): Promise<T | null> {
    const url = `${BASE_URL}${endpoint}/${id}/sum`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return result;
    } catch (error) {
      return null;
    }
  }

  public static async get<T>(endpoint: Endpoint, token: string, id: string): Promise<T | null> {
    const url = `${BASE_URL}${endpoint}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: authorization,
      });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  public static async delete(endpoint: Endpoint, token: string, id: string): Promise<void | null> {
    const url = `${BASE_URL}${endpoint}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.DELETE,
        headers: authorization,
      });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async getAll<T>(endpoint: Endpoint, token: string): Promise<T[]> {
    const url = `${BASE_URL}${endpoint}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      if (!response.ok) {
        return [];
      }

      const dataResponse: T[] = await response.json();
      return dataResponse;
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return [];
    }
  }

  public static async getFiltered<T>(endpoint: Endpoint, token: string, params: IFilterParams): Promise<T[]> {
    const filterParams = new URLSearchParams(params as { [key: string]: string });
    const url = `${BASE_URL}${endpoint}?${filterParams}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      if (!response.ok) {
        return [];
      }

      const dataResponse: T[] = await response.json();

      return dataResponse;
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return [];
    }
  }
}

export default RequestApi;
