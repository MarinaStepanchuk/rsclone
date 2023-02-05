import './Authorization.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import AuthorisationForm from '../../components/AuthorizationForm/AuthorizationForm';
import img1 from '../../assets/img/schedule-start-1.png';
import img2 from '../../assets/img/schedule-start-2.png';
import img3 from '../../assets/img/schedule-start-3.png';
import img4 from '../../assets/img/schedule-start-4.png';
import img5 from '../../assets/img/schedule-start-5.png';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG_ATTRIBUTE } from '../../constants/common.constants';
import { LANG } from '../../types/types';

const GreatingImages: string[] = [img1, img2, img3, img4, img5];

// язык приходит с сервера
const lang = 'EN';

class Main {
  private lang: LANG;

  constructor() {
    this.lang = lang;
  }

  public render(): void {
    const imgContainer = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.imgContainer],
    });
    const img = new Image();
    let index = 0;
    img.src = GreatingImages[index];
    index += 1;
    imgContainer.replaceChildren(img);
    imgContainer.addEventListener('click', () => {
      if (index < GreatingImages.length - 1) {
        img.src = GreatingImages[index];
        index += 1;
      } else {
        img.src = GreatingImages[index];
        index = 0;
      }
    });

    const title = createElement({
      tag: 'h1',
      classList: [ClassMap.authorization.title, ClassMap.mode.light.title],
      key: DictionaryKeys.authorizationTitle,
      content: Dictionary[lang].authorizationTitle,
    });
    const subTitle = createElement({
      tag: 'span',
      classList: [ClassMap.authorization.greeting, ClassMap.mode.light.font],
      key: DictionaryKeys.authorizationGreeting,
      content: Dictionary[lang].authorizationGreeting,
    });
    const slider = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.slider],
    });
    slider.innerHTML = `
      <swiper-container class="authorization__quote mySwiper ${ClassMap.mode.light.font}" pagination="true" pagination-clickable="true" space-between="30" centered-slides="true" autoplay-delay="5000" autoplay-disable-on-interaction="false">
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote1}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote1}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote2}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote2}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote3}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote3}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote4}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote4}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote5}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote5}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote6}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote6}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote7}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote7}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote8}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote8}</swiper-slide>
        <swiper-slide class="${ClassMap.authorization.slide}" key="${DictionaryKeys.quote9}" "data-lang=${LANG_ATTRIBUTE}">${Dictionary[lang].quote9}</swiper-slide>
      </swiper-container>
    `;

    const wrapper = createElement({
      tag: 'div',
      classList: [ClassMap.authorization.wrapper],
    });

    const section = createElement({
      tag: 'section',
      classList: [ClassMap.authorization.section, ClassMap.mode.light.background],
    });
    const form = new AuthorisationForm(this.lang, section).element;
    wrapper.append(imgContainer, form);
    section.append(title, subTitle, slider, wrapper);

    document.body.replaceChildren(section);
  }
}

export default Main;
