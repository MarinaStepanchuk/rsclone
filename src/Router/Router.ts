import { LocalStorageKey } from '../constants/common';
import { ClassMap } from '../constants/htmlConstants';
import ErrorPage from '../pages/Error/ErrorPage';
import { Routes, homePagePath, basePath } from './Routes';

class Router {
  public start(): void {
    window.history.pushState({ homePagePath }, homePagePath, homePagePath);
    window.onpopstate = this.handleLocation;
    this.handleLocation();
  }

  public route(event: Event): void {
    if (!localStorage.getItem(LocalStorageKey.auth)) {
      window.history.pushState({ basePath }, basePath, basePath);
    }

    const targetElement = event.target as HTMLElement;
    const parentButton = targetElement.closest(`.${ClassMap.transitionButoon}`);
    const parentLink = targetElement.closest(`.${ClassMap.transitionLink}`);
    if (!parentLink && !parentButton) {
      return;
    }

    if (parentButton) {
      this.buttonRoute(parentButton as HTMLButtonElement);
    }

    if (parentLink) {
      this.linkRoute(parentLink as HTMLAnchorElement, event);
    }
  }

  private linkRoute(link: HTMLAnchorElement, event: Event): void {
    if (link.href.startsWith('http')) {
      return;
    }
    event.preventDefault();
    const { pathname: path } = new URL(link.href);
    window.history.pushState({ path }, path, path);
    this.handleLocation();
  }

  private buttonRoute(button: HTMLButtonElement): void {
    const path = button.getAttribute('data-link') as string;
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
