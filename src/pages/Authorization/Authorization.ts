import './Authorization.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import AutorisationForm from '../../components/AutorisationForm/AutorisationForm';
import img1 from '../../assets/img/schedule-start-1.png';
import img2 from '../../assets/img/schedule-start-2.png';
import img3 from '../../assets/img/schedule-start-3.png';
import img4 from '../../assets/img/schedule-start-4.png';
import img5 from '../../assets/img/schedule-start-5.png';
import getRandomArrayIndex from '../../utils/getRandomArrayIndex';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG_ATTRIBUTE } from '../../constants/common.constants';

const GreatingImages: string[] = [img1, img2, img3, img4, img5];

// язык приходит с сервера
const lang = 'EN';

class Main {
  public render(): void {
    const section = createElement({
      tag: 'section',
      classList: [ClassMap.autorisation.section, ClassMap.mode.light.background],
    });
    const imgContainer = createElement({
      tag: 'section',
      classList: [ClassMap.autorisation.section],
    });
    const img = new Image();
    img.src = GreatingImages[getRandomArrayIndex(GreatingImages)];
    imgContainer.append(img);
    const title = createElement({
      tag: 'h1',
      classList: [ClassMap.autorisation.title, ClassMap.mode.light.title],
      key: DictionaryKeys.authorizationTitle,
      content: Dictionary[lang].authorizationTitle,
    });
    const subTitle = createElement({
      tag: 'span',
      classList: [ClassMap.autorisation.greeting, ClassMap.mode.light.font],
      key: DictionaryKeys.authorizationGreeting,
      content: Dictionary[lang].authorizationGreeting,
    });
    const slider = createElement({
      tag: 'div',
      classList: [ClassMap.autorisation.slider],
    });
    slider.innerHTML = `
      <swiper-container class="authorization__quote mySwiper ${ClassMap.mode.light.font}" pagination="true" pagination-clickable="true" space-between="30" centered-slides="true" autoplay-delay="5000" autoplay-disable-on-interaction="false">
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote1}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote1}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote2}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote2}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote3}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote3}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote4}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote4}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote5}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote5}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote6}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote6}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote7}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote7}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote8}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote8}</swiper-slide>
        <swiper-slide class="${ClassMap.autorisation.slide}" key="${DictionaryKeys.quote9}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote9}</swiper-slide>
      </swiper-container>
    `;
    const form = new AutorisationForm(lang).element;
    section.append(imgContainer, title, subTitle, slider, form);
    document.body.replaceChildren(section);
  }
}

// const p = createElement({
//   tag: 'p', classList: ['text'], content: 'Я стартовая страница', id: '12',
// });
// const button = createElement({ tag: 'button', key: DictionaryKeys.transition, content: dictionary[lang].transition }) as HTMLButtonElement;
// const a = createElement({ tag: 'a', content: 'переход' }) as HTMLLinkElement;
// // таким образом удаляются все текущие дочерние элементы и вставляются свои
// document.body.replaceChildren(p, button, a);
// // внутренняя ссылка
// a.href = Path.DASHBOARD;
// // внешняя ссылка должна начинаться с http
// a.href = 'https://learn.javascript.ru/destructuring-assignment';
// // кнопка, которая переключает страницу
// button.setAttribute('data-link', Path.DASHBOARD);
// // кнопка,которая не переключает страницу НЕ должна иметь атрибута data-link

export default Main;
