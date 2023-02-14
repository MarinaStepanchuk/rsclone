import { ISupportMsg } from '../types/interfaces';
import {
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
  BASE_URL,
  Endpoint,
} from './serverConstants';

class TelegramMsgApi {
  public static async sendMsg(token: string, userMessage: ISupportMsg) {
    const url = `${BASE_URL}${Endpoint.MESSEAGE}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(userMessage),
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

export default TelegramMsgApi;
