import './SvgModal.scss';
import createElement from '../../utils/createElement';
import AppState from '../../constants/appState';
import { ClassMap } from '../../constants/htmlConstants';
import { MODE } from '../../types/types';

type SvgIconsMap = {
  [key: string]: string
};

class SvgModal {
  private modeValue: MODE;

  constructor(private svgMap: SvgIconsMap) {
    this.modeValue = AppState.modeValue;
  }

  public render(): HTMLElement {
    const modalWrapper = createElement({
      tag: 'div',
      classList: [ClassMap.iconsBlock.wrapper],
    });

    const container = createElement({
      tag: 'div',
      classList: [ClassMap.iconsBlock.container, ClassMap.mode[this.modeValue].modal],
    });

    const icons = Object.keys(this.svgMap);

    icons.forEach((icon) => {
      if (icon !== 'base' && icon !== 'plus') {
        const iconItem = createElement({
          tag: 'div',
          classList: [ClassMap.iconsBlock.item],
          id: icon,
        });
        iconItem.innerHTML = this.svgMap[icon];
        container.append(iconItem);
      }
    });

    const closeButton = createElement({
      tag: 'div',
      classList: [ClassMap.closeModalButton],
    });
    const firstLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].background],
    });
    const secondLine = createElement({
      tag: 'span',
      classList: [ClassMap.closeLine, ClassMap.mode[this.modeValue].background],
    });
    closeButton.append(firstLine, secondLine);

    container.append(closeButton);
    modalWrapper.append(container);

    modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.iconsBlock.wrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        modalWrapper.remove();
      }
    });

    container.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest(`.${ClassMap.iconsBlock.item}`)) {
        const icon = document.querySelector(`.${ClassMap.creater.createIcon}`) as HTMLElement;
        const { id } = targetElement.closest(`.${ClassMap.iconsBlock.item}`) as HTMLElement;
        icon.innerHTML = this.svgMap[id];
        icon.id = id;
        const submitForm = document.querySelector(`.${ClassMap.creater.createSubmit}`) as HTMLButtonElement;
        submitForm.disabled = false;
        modalWrapper.remove();
      }
    });

    return modalWrapper;
  }
}

export default SvgModal;
