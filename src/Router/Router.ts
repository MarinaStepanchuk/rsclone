import ErrorPage from '../pages/Error/ErrorPage';
import { Routes, homePagePath } from './Routes';
import { LocalStorageKey } from '../constants/common';

class Router {
  public start(): void {
    window.history.pushState({ homePagePath }, homePagePath, homePagePath);
    window.onpopstate = this.handleLocation;
    this.handleLocation();
  }

  public route(event: Event): void {
    const targetElement = event.target;

    if (!(targetElement instanceof HTMLAnchorElement) && !(targetElement instanceof HTMLButtonElement)) {
      return;
    }

    if (targetElement instanceof HTMLButtonElement && targetElement.hasAttribute('data-link')) {
      this.buttonRoute(event);
    }

    if (targetElement instanceof HTMLAnchorElement) {
      this.linkRoute(event);
    }
  }

  private linkRoute(event: Event): void {
    const linkElement = event.target as HTMLAnchorElement;

    if (linkElement.href.startsWith('http')) {
      return;
    }

    event.preventDefault();
    const { pathname: path } = new URL(linkElement.href);
    window.history.pushState({ path }, path, path);
    this.handleLocation();
  }

  private buttonRoute(event: Event): void {
    const buttonElement = event.target as HTMLButtonElement;
    const path = buttonElement.getAttribute('data-link') as string;
    window.history.pushState({ path }, path, path);
    this.handleLocation();
  }

  private handleLocation(): void {
    let path = window.location.pathname;
    const indexOfSecondSlash = path.indexOf('/', 1);

    if (indexOfSecondSlash !== -1) {
      path = path.substring(0, indexOfSecondSlash);
    }

    if (Routes[path as keyof typeof Routes]) {
      Routes[path as keyof typeof Routes]();
    } else {
      new ErrorPage().render();
    }
  }
}

export default Router;
