import { IUserRegister, IUserLogin, IUserData } from '../types/interfaces';
import {
  REQUEST_URL,
  REQUEST_METOD,
  RESPONSE_STATUS,
  CONTENT_TYPE_JSON,
} from './serverConstants';
import applicationState from '../constants/appState';

class UserApi {
  public static async registrationUser(userData: IUserRegister): Promise<{ status: number; message: string }> {
    const url = `${REQUEST_URL.register}`;

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: CONTENT_TYPE_JSON,
        body: JSON.stringify(userData),
      });

      if (response.status === RESPONSE_STATUS.CREATED) {
        applicationState.isUserLogin = false;
      }

      return {
        status: response.status,
        message: await response.json(),
      };
      //! status 201 (created)
      //! messege 'User successfully registered' or `A user with ${email} already exists`
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async loginUser(loginUserData: IUserLogin): Promise<{ status: number; message: string }> {
    const url = `${REQUEST_URL.login}`;

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: CONTENT_TYPE_JSON,
        body: JSON.stringify(loginUserData),
      });

      let responseMessage = '';

      if (response.status === RESPONSE_STATUS.OK) {
        applicationState.isUserLogin = true;
        localStorage.setItem('auth', JSON.stringify(await response.json()));
        responseMessage = 'Login successful';
      } else {
        responseMessage = await response.json();
      }

      return {
        status: response.status,
        message: responseMessage,
      };
      //! status 200 (ok)
      //! messege 'Login successful' or `Email ${email} not found` or 'Invalid password, please try again!'
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async updateUser(token: string, updateUserData: Partial<IUserData>): Promise<{ status: number; message: string }> {
    const url = `${REQUEST_URL.update}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(updateUserData),
      });

      let responseMessage = '';

      if (response.status === RESPONSE_STATUS.OK) {
        localStorage.auth.user = JSON.stringify(await response.json());
        responseMessage = 'Successfully updated';
      } else {
        responseMessage = await response.json();
      }

      return {
        status: response.status,
        message: responseMessage,
      };
      //! status 200 (ok)
      //! messege 'Successfully updated' or `A user with {email} already exists` or 'User not found'
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default UserApi;
