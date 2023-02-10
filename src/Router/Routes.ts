import Authorization from '../pages/Authorization/Authorization';
import Dashboard from '../pages/Dashboard/Dashboard';
import Wallet from '../pages/Wallet/Wallet';
import Analytics from '../pages/Analytics/Analytics';
import Account from '../pages/Account/Account';

export const Routes = {
  '/': (): void => new Authorization().render(),
  '/dashboard': ():void => new Dashboard().render(),
  '/wallet': ():void => new Wallet().render(),
  '/analytics': ():void => new Analytics().render(),
  '/account': ():void => new Account().render(),
};

export const basePath = '/';
