import { IUserRegister, IUserLogin, IUserData } from '../types/interfaces';
import {
  BASE_URL,
  REQUEST_METOD,
  RESPONSE_STATUS,
  CONTENT_TYPE_JSON,
  Endpoint,
} from './serverConstants';
import AppState from '../constants/appState';

class UserApi {
  public static async registrationUser(userData: IUserRegister): Promise<{ status: number; message: string }> {
    const url = `${BASE_URL}${Endpoint.REGISTER}`;

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: CONTENT_TYPE_JSON,
        body: JSON.stringify(userData),
      });

      if (response.status === RESPONSE_STATUS.CREATED) {
        AppState.isUserLogin = false;
      }

      const dataResponse = await response.json();

      return {
        status: response.status,
        ...dataResponse,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async loginUser(loginUserData: IUserLogin):
  Promise<{ status: number; message: string, token?: string, user?: IUserData }> {
    const url = `${BASE_URL}${Endpoint.LOGIN}`;

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: CONTENT_TYPE_JSON,
        body: JSON.stringify(loginUserData),
      });

      const dataResponse = await response.json();

      return {
        status: response.status,
        ...dataResponse,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async updateUser(token: string, updateUserData: Partial<IUserData>): Promise<{ status: number; message: string }> {
    const url = `${BASE_URL}${Endpoint.USER_UPDATE}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(updateUserData),
      });

      const dataResponse = await response.json();

      return {
        status: response.status,
        ...dataResponse,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default UserApi;
