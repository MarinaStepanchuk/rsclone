import AccountApi from "../../Api/AccountApi";
import { RESPONSE_STATUS } from "../../Api/serverConstants";
import UserApi from "../../Api/UserApi";
import { defaultAccounts } from "../../constants/common";
import { IAccount, IUserLogin } from "../../types/interfaces";

async function setDefaultUserAccount(userLogin: IUserLogin): Promise<void> {
  const response = await UserApi.loginUser(userLogin);
    if (response.status === RESPONSE_STATUS.OK) {
      const { token } = response;

      const accounts: IAccount[] = defaultAccounts;
      for (const account of accounts) {
        await AccountApi.createAccount(token as string, account);
      }
    }
}

export default setDefaultUserAccount;
