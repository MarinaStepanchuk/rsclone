import { IUserRegister, IUserLogin, IUserData } from '../types/interfaces';
import {
  BASE_URL,
  REQUEST_METOD,
  RESPONSE_STATUS,
  CONTENT_TYPE_JSON,
  Endpoint,
} from './serverConstants';
import AppState from '../constants/appState';
import AlertMessage from '../components/AlertMessage/AlertMessege';
import { alertTimeout } from '../constants/common';
import { Dictionary } from '../constants/dictionary';

class UserApi {
  public static async registrationUser(userData: IUserRegister): Promise<{ status: number; message: string } | null> {
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
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async loginUser(loginUserData: IUserLogin):
  Promise<{ status: number; message: string, token?: string, user?: IUserData } | null> {
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
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async updateUser(token: string, updateUserData: Partial<IUserData>): Promise<{ status: number; message: string, user?: IUserData } | null> {
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
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }

  public static async updateUserPassword(token: string, updateUserPassword: Partial<IUserLogin>): Promise<{ status: number; message: string } | null> {
    const url = `${BASE_URL}${Endpoint.USER_UPDATE_PASSWORD}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(updateUserPassword),
      });

      const dataResponse = await response.json();

      return {
        status: response.status,
        ...dataResponse,
      };
    } catch (error) {
      const alert = new AlertMessage(`${Dictionary[AppState.lang].error}`, RESPONSE_STATUS.BAD_REQUEST);
      alert.render();
      setTimeout(() => alert.remove(), alertTimeout);
      return null;
    }
  }
}

export default UserApi;
