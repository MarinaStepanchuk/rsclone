import './LangSwitcher.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import imgDE from '../../assets/icons/de.svg';
import imgRU from '../../assets/icons/ru.svg';
import imgEN from '../../assets/icons/gb.svg';
import { SwitcherSize } from '../../types/enums';
import { LocalStorageKey } from '../../constants/common';
import changeLang from '../../utils/changeLang';

type Lang = {
  [key in LANG]: string;
};

const languages: Lang = {
  DE: imgDE,
  RU: imgRU,
  EN: imgEN,
};

class LangSwitcher {
  private modeValue: MODE;

  private lang: LANG;

  public switcher: HTMLElement | null = null;

  public switchersContainer: HTMLElement | null = null;

  constructor(private size: SwitcherSize) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.init();
  }

  private init(): void {
    this.switcher = createElement({
      tag: 'div',
      classList: [ClassMap.langSwitcher.button, ClassMap.langSwitcher[this.size]],
      id: this.lang,
    });

    this.switcher.style.backgroundImage = `URL(${languages[this.lang]})`;

    this.switchersContainer = createElement({
      tag: 'div',
      classList: [ClassMap.langSwitcher.container],
    });

    this.fillSwitcherContainer();
  }

  public render(): HTMLElement {
    const switcher = this.switcher as HTMLElement;

    switcher.replaceChildren(this.switchersContainer as HTMLElement);

    switcher.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      (this.switchersContainer as HTMLElement).classList.toggle(ClassMap.langSwitcher.show);

      if (targetElement.id !== this.lang) {
        localStorage.setItem(LocalStorageKey.lang, targetElement.id);
        this.lang = targetElement.id as LANG;
        AppState.lang = this.lang;
        switcher.id = this.lang;
        switcher.style.backgroundImage = `URL(${languages[this.lang]})`;
        this.fillSwitcherContainer();
        changeLang(this.lang);
      }
    });

    document.body.addEventListener('click', (event) => {
      if (!(event.target as HTMLElement).classList.contains(ClassMap.langSwitcher.button)) {
        (this.switchersContainer as HTMLElement).classList.remove(ClassMap.langSwitcher.show);
      }
    });

    return switcher;
  }

  private fillSwitcherContainer(): void {
    (this.switchersContainer as HTMLElement).innerHTML = '';

    const langObj = Object.keys(languages) as LANG[];
    langObj.forEach((lang) => {
      if (this.lang !== lang) {
        this.switchersContainer?.append(this.getLangItem(lang));
      }
    });
  }

  private getLangItem(lang: LANG):HTMLElement {
    const switherItem = createElement({
      tag: 'div',
      classList: [ClassMap.langSwitcher.item],
      id: lang,
    });

    switherItem.style.backgroundImage = `URL(${languages[lang]})`;

    return switherItem;
  }
}

export default LangSwitcher;
