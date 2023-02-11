import { ISupportMsg } from '../types/interfaces';
import {
  REQUEST_URL,
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
} from './serverConstants';

class TelegramMsgApi {
  public static async sendMsg(token: string, userMessage: ISupportMsg) {
    const url = `${REQUEST_URL.message}`;
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
