import { ClassMap } from '../../constants/htmlConstants';
import './CustomSelect.scss';

class CustomSelect {
  private element: HTMLElement;

  private isOpen: boolean;

  constructor(options: HTMLElement, private titleClass: string) {
    this.element = options;
    this.isOpen = false;
    this.addListener();
  }

  private addListener(): void {
    this.element.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.className === this.titleClass) {
        this.toggle();
      } else if (targetElement.tagName === 'LI') {
        this.setValue(targetElement.innerHTML, targetElement.getAttribute('key') as string);
        this.close();
      }
    });

    const arrow = this.element.querySelector(`.${ClassMap.customSelect.arrow}`) as HTMLElement;

    arrow.addEventListener('click', () => {
      this.toggle();
    });

    document.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (!this.element) {
        return;
      }
      if (!this.element.contains(targetElement)) {
        this.close();
      }
    });
  }

  private toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open() {
    this.element.classList.add('open');
    (this.element.querySelector(`.${ClassMap.customSelect.arrow}`) as HTMLElement).classList.add('open');
    this.isOpen = true;
  }

  private close() {
    this.element.classList.remove('open');
    (this.element.querySelector(`.${ClassMap.customSelect.arrow}`) as HTMLElement).classList.remove('open');
    this.isOpen = false;
  }

  private setValue(title: string, key: string) {
    (this.element.querySelector(`.${this.titleClass}`) as HTMLElement).innerHTML = title;

    const widgetEvent = new CustomEvent('select', {
      bubbles: true,
      detail: {
        title,
        key,
      },
    });

    this.element.dispatchEvent(widgetEvent);
  }
}

export default CustomSelect;
