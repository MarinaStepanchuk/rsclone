import Authorization from '../pages/Authorization/Authorization';
import Dashboard from '../pages/Dashboard/Dashboard';
import Wallet from '../pages/Wallet/Wallet';
import Analytics from '../pages/Analytics/Analytics';
import Account from '../pages/Account/Account';
import { LocalStorageKey } from '../constants/common';

export const Routes = {
  '/': (): void => new Authorization().render(),
  '/dashboard': ():Promise<void> => new Dashboard().render(),
  '/wallet': ():Promise<void> => new Wallet().render(),
  '/analytics': ():Promise<void> => new Analytics().render(),
  '/account': ():void => new Account().render(),
};

const path = window.location.pathname;

export const homePagePath = !localStorage.getItem(LocalStorageKey.auth) ? '/' : path === '/dashboard' || path === '/' || path === '' ? '/dashboard' : path.substring(0, path.indexOf('/', 1));

export const basePath = '/';
