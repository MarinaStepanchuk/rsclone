import RequestsApi from '../../Api/RequestsApi';
import { Endpoint, RESPONSE_STATUS } from '../../Api/serverConstants';
import UserApi from '../../Api/UserApi';
import { IAccount, ICategory, IUserLogin } from '../../types/interfaces';

async function setDefaultUserProperties(endpoint: Endpoint, userLogin: IUserLogin, prop: IAccount[] | ICategory[]): Promise<void> {
  const response = await UserApi.loginUser(userLogin);

  if (response?.status === RESPONSE_STATUS.OK) {
    const { token } = response;

    prop.forEach(async (account) => {
      await RequestsApi.create(endpoint, token as string, account);
    });
  }
}

export default setDefaultUserProperties;
