import { IFilterParams } from '../types/interfaces';
import {
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
  Endpoint,
  BASE_URL,
} from './serverConstants';

class RequestApi {
  public static async create<T>(endpoint: Endpoint, token: string, data: T): Promise<T> {
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
      throw new Error(`${error}`);
    }
  }

  public static async update<T>(endpoint: Endpoint, token: string, id: string, data: Partial<T>): Promise<T> {
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
      throw new Error(`${error}`);
    }
  }

  public static async get<T>(endpoint: Endpoint, token: string, id: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}/${id}`;
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

  public static async delete(endpoint: Endpoint, token: string, id: string): Promise<void> {
    const url = `${BASE_URL}${endpoint}/${id}`;
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

  public static async getAll<T>(endpoint: Endpoint, token: string): Promise<T[]> {
    const url = `${BASE_URL}${endpoint}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      const dataResponse: T[] = await response.json();

      return dataResponse;
    } catch (error) {
      throw new Error(`${error}`);
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

      const dataResponse: T[] = await response.json();

      return dataResponse;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default RequestApi;
