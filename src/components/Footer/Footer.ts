import './Footer.scss';
import createElement from '../../utils/createElement';
import { Attributes, ClassMap, ImagePath, Titles, PageLink } from '../../constants/htmlConstants';

class Footer {
  public render(): HTMLElement {
    const footerLogoImg = createElement({
      tag: 'img',
      classList: [ClassMap.footer.footerLogo],
    }) as HTMLImageElement;

    footerLogoImg.src = ImagePath.footer.footerLogoRs;
    footerLogoImg.alt = Titles.rsSchool;
    footerLogoImg.title = Titles.rsSchool;

    const footerLogoLink = createElement({ tag: 'a' }) as HTMLLinkElement;

    footerLogoLink.href = PageLink.rsSchool;
    footerLogoLink.setAttribute(Attributes.target, Attributes.targetValue);
    footerLogoLink.setAttribute(Attributes.rel, Attributes.relValue);

    footerLogoLink.append(footerLogoImg);

    const footerCopyright = createElement({
      tag: 'span',
      classList: [ClassMap.footer.footerCopyright],
      content: Titles.copyright,
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
      classList: [ClassMap.footer.footer],
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
    footerGithubLink1.setAttribute(Attributes.target, Attributes.targetValue);
    footerGithubLink1.setAttribute(Attributes.rel, Attributes.relValue);

    footerGithubLink1.append(this.getGithubImage());

    return footerGithubLink1;
  }

  private getGithubImage(): HTMLImageElement {
    const footerGithubLogo = createElement({
      tag: 'img',
      classList: [ClassMap.footer.footerGithubLogo],
    }) as HTMLImageElement;

    footerGithubLogo.src = ImagePath.footer.footerLogoGithub;
    footerGithubLogo.alt = Titles.github;
    footerGithubLogo.title = Titles.github;
    return footerGithubLogo;
  }
}

export default Footer;
