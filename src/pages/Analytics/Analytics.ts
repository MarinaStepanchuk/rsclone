import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { IAccount, IAccountUpdate, ICategory, ICategoryUpdate, IExpense, IExpenseUpdate } from '../../types/interfaces';
import ExpenseApi from '../../Api/ExpenseApi';
import AccountApi from '../../Api/AccountApi';
import AppState from '../../constants/appState';
import CategoryApi from '../../Api/CategoryApi';

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

      // TODO Account Api
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

      // TODO Category Api
      //! создание категории
      // const fakeNewCategory: ICategory = {
      //   category: 'My new category',
      //   icon: 'category-icon',
      // };
      // const newCategory: ICategory = await CategoryApi.createCategory(userToken, fakeNewCategory);
      // console.log(newCategory);

      //! изменение категории (id и любые параметры)
      // const fakeСhangedCategory: ICategoryUpdate = {
      //   _id: '63eb331cc9812010d1b8ffd5',
      //   icon: 'icon8',
      // };
      // const changedCategory: ICategory = await CategoryApi.updateCategory(userToken, fakeСhangedCategory);
      // console.log(changedCategory);

      //! удаление категории
      // const fakeId = '63eb34d1c9812010d1b8ffdc';
      // await CategoryApi.deleteCategory(userToken, fakeId);

      //! получение всeх категорий пользователя
      // const categoriesData: ICategory[] = await CategoryApi.getCategories(userToken);
      // console.log(categoriesData);

      //! получение категории по id
      // const fakeId = '63eb34cec9812010d1b8ffda';
      // const category = await CategoryApi.getCategory(userToken, fakeId);
      // console.log(category);

      // TODO Expense Api
      //! получение всех расходов пользователя
      // const expensesData: IExpense[] = await ExpenseApi.getExpenses(userToken);
      // console.log(expensesData);

      //! создание расхода
      // const fakeNewExpense: IExpense = {
      //   date: new Date(),
      //   account: 'Cash',
      //   category: 'House',
      //   expense: 10,
      //   currency: 'USD',
      //   comment: 'optional parameter',
      // };
      // const newExpense: IExpense = await ExpenseApi.createExpense(userToken, fakeNewExpense);
      // console.log(newExpense);

      //! изменение категории (id и любые параметры)
      // const fakeСhangedExpense: IExpenseUpdate = {
      //   _id: '63eb3c65c9812010d1b8ffe1',
      //   comment: 'new comment',
      // };
      // const changedExpense: IExpense = await ExpenseApi.updateExpense(userToken, fakeСhangedExpense);
      // console.log(changedExpense);

      //! удаление категории
      // const fakeId = '63eb3c65c9812010d1b8ffe1';
      // await ExpenseApi.deleteExpense(userToken, fakeId);

      //! получение расхода по id
      // const fakeId = '63eb3c65c9812010d1b8ffe1';
      // const expense = await ExpenseApi.getExpense(userToken, fakeId);
      // console.log(expense);
    }
  }

  private async handleCreateAccountResponse(token: string, accountData: IAccount) {
    const response = await AccountApi.createAccount(token, accountData);
  }
}

export default Analytics;
