import {IAccount} from "../../types/interfaces";
import {LocalStorageKey} from "../../constants/common";
import RequestApi from "../../Api/RequestsApi";
import {Endpoint} from "../../Api/serverConstants";

class BaseModal {
  // private async getAllAccounts(): Promise<IAccount[]> {
  //   const userToken: string = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
  //   const accountsData: IAccount[] = await RequestApi.getAll(Endpoint.ACCOUNT, userToken);
  //   return accountsData;
  // }
}
