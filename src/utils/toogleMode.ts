import { ClassMap } from '../constants/htmlConstants';
import { MODE } from '../types/types';
import { ModeItem } from '../types/enums';

export function toggleClassMode(elements: NodeListOf<Element>, modeValue: MODE, previosMode: MODE, modeType: ModeItem) {
  elements.forEach((element: Element) => {
    element.classList.toggle(`${ClassMap.mode[modeValue][modeType]}`);
    element.classList.toggle(`${ClassMap.mode[previosMode][modeType]}`);
  });
}

export default toggleClassMode;
