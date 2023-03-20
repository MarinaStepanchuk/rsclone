import './Footer.scss';
import createElement from '../../utils/createElement';
import {
  Attribute,
  ClassMap,
  Title,
  PageLink,
} from '../../constants/htmlConstants';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import { SvgMap } from '../../constants/svgMap';

class Footer {
  private modeValue: MODE;

  private lang: LANG;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public render(): HTMLElement {
    const footerLogoImg = createElement({
      tag: 'div',
      classList: [ClassMap.footer.footerLogo, ClassMap.mode[this.modeValue].icon],
    }) as HTMLElement;

    footerLogoImg.innerHTML = SvgMap.rsLogo;

    const footerLogoLink = createElement({ tag: 'a' }) as HTMLLinkElement;

    footerLogoLink.href = PageLink.rsSchool;
    footerLogoLink.setAttribute(Attribute.target, Attribute.targetValue);
    footerLogoLink.setAttribute(Attribute.rel, Attribute.relValue);

    footerLogoLink.append(footerLogoImg);

    const footerCopyright = createElement({
      tag: 'span',
      classList: [ClassMap.footer.footerCopyright, ClassMap.mode[this.modeValue].title],
      content: Title.copyright,
    });

    const footerGithubWrap = createElement({
      tag: 'div',
      classList: [ClassMap.footer.footerGithubWrap],
    });

    footerGithubWrap.append(
      this.getGitHubHLink(PageLink.firstGithub),
      this.getGitHubHLink(PageLink.secondGithub),
      this.getGitHubHLink(PageLink.thirdGithub),
    );

    const footer = createElement({
      tag: 'footer',
      classList: [ClassMap.footer.footer, ClassMap.mode[this.modeValue].background, ClassMap.mode[this.modeValue].font],
    });

    footer.append(footerLogoLink, footerCopyright, footerGithubWrap);

    return footer;
  }

  private getGitHubHLink(url: string): HTMLLinkElement {
    const footerGithubLink1 = createElement({
      tag: 'a',
      classList: [ClassMap.footer.footerGithub],
    }) as HTMLLinkElement;

    footerGithubLink1.href = url;
    footerGithubLink1.setAttribute(Attribute.target, Attribute.targetValue);
    footerGithubLink1.setAttribute(Attribute.rel, Attribute.relValue);

    footerGithubLink1.append(this.getGithubImage());

    return footerGithubLink1;
  }

  private getGithubImage(): HTMLElement {
    const footerGithubLogo = createElement({
      tag: 'div',
      classList: [ClassMap.footer.footerGithubLogo, ClassMap.mode[this.modeValue].icon],
    }) as HTMLElement;

    footerGithubLogo.innerHTML = SvgMap.gitHubLogo;
    return footerGithubLogo;
  }
}

export default Footer;
