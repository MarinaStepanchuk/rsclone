import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { IAccount, IAccountUpdate, IExpense } from '../../types/interfaces';
import ExpenseApi from '../../Api/ExpenseApi';
import AccountApi from '../../Api/AccountApi';
import AppState from '../../constants/appState';

class Analytics extends BasePage {
  public render(): void {
    this.createPageStructure(Route.ANALYTICS);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const analyticsContainer = createElement({
      tag: 'div',
      classList: ['test-class'],
      content: 'Тут analytics',
    });

    mainContent?.replaceChildren(analyticsContainer);

    this.init();
  }

  public async init() {
    if (AppState.userAccount) {
      const userToken: string = JSON.parse(AppState.userAccount).token;

      //! создание пользовательского счета
      // const fakeNewAccount: IAccount = {
      //   account: 'My new account3',
      //   sum: 500,
      //   icon: 'icon',
      // };
      // const newAccount: IAccount = await AccountApi.createAccount(userToken, fakeNewAccount);
      // console.log(newAccount);

      //! изменение счета (id и любые параметры)
      // const fakeСhangedAccount: IAccountUpdate = {
      //   _id: '63ea34643559e1d7fd9b99cf',
      //   icon: 'icon4',
      // };
      // const changedAccount: IAccount = await AccountApi.updateAccount(userToken, fakeСhangedAccount);
      // console.log(changedAccount);

      //! удаление счета
      // const fakeId = '63ea3b753559e1d7fd9b99d7';
      // await AccountApi.deleteAccount(userToken, fakeId);

      //! получение всeх счетов пользовтеля
      // const accountsData: IAccount[] = await AccountApi.getAccounts(userToken);
      // console.log(accountsData);

      //! получение счета по id
      // const fakeId = '63ea225822d0c00117d651d6';
      // const account = await AccountApi.getAccount(userToken, fakeId);
      // console.log(account);

      //! получение всех расходов пользователя
      // const expensesData: IExpense[] = await ExpenseApi.getExpenses(userToken);
      // console.log(expensesData);
    }
  }

  private async handleCreateAccountResponse(token: string, accountData: IAccount) {
    const response = await AccountApi.createAccount(token, accountData);
  }
}

export default Analytics;
