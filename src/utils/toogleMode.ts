import { ClassMap } from '../constants/htmlConstants';
import { IModeItem } from '../types/interfaces';

export function addDarkMode(elements: NodeListOf<Element>, modeValue: keyof IModeItem) {
  elements.forEach((element: Element) => {
    element.classList.remove(`${ClassMap.mode.light[modeValue]}`);
    element.classList.add(`${ClassMap.mode.dark[modeValue]}`);
  });
}

export function addLightMode(elements: NodeListOf<Element>, modeValue: keyof IModeItem) {
  elements.forEach((element: Element) => {
    element.classList.remove(`${ClassMap.mode.light[modeValue]}`);
    element.classList.add(`${ClassMap.mode.light[modeValue]}`);
  });
}
