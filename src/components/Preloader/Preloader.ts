import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';

import './Preloader.scss';

class Preloader {
  private preloader: HTMLElement | null = null;

  private parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  public render(): void {
    this.preloader = createElement({
      tag: 'div',
      classList: [
        ClassMap.preloader,
      ],
    });
    this.preloader.innerHTML = `
      <hr/>
      <hr/>
      <hr/>
      <hr/>
    `;

    this.parentElement.append(this.preloader);
  }

  public remove(): void {
    this.preloader?.remove();
  }
}

export default Preloader;
