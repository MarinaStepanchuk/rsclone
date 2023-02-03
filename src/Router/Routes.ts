import Main from '../pages/Main/Main';
import Dashboard from '../pages/Dashboard/Dashboard';
import Wallet from '../pages/Wallet/Wallet';
import Analytics from '../pages/Analytics/Analytics';
import Account from '../pages/Account/Account';

const Routes = {
  '/': (): void => new Main().render(),
  '/dashboard': ():void => new Dashboard().render(),
  '/wallet': ():void => new Wallet().render(),
  '/analytics': ():void => new Analytics().render(),
  '/account': ():void => new Account().render(),
};

export default Routes;
