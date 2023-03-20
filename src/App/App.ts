import { ClassMap } from '../constants/htmlConstants';
import Router from '../Router/Router';
import AdaptiveMenu from '../components/AdaptiveMenu/AdaptiveMenu';
import MainMenu from '../components/MainMenu/MainMenu';

class App {
  public start(): void {
    new Router().start();

    document.addEventListener('click', (event) => {
      new Router().route(event);
    });

    window.addEventListener('resize', () => {
      const width = document.body.clientWidth;
      if (width <= 830) {
        const menuBlock = document.querySelector(`.${ClassMap.menu.menuSection}`);
        menuBlock?.replaceChildren(new AdaptiveMenu().render(window.location.pathname));
      } else {
        const menuBlock = document.querySelector(`.${ClassMap.adaptiveMenu.section}`);
        menuBlock?.replaceWith(new MainMenu().render(window.location.pathname));
      }
    });
  }
}

export default App;
