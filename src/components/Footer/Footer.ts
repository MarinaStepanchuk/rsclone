import './Footer.scss';
import createElement from '../../utils/createElement';
import footerLogoRs from '../../assets/icons/rs-school-js.svg';
import footerLogoGithub from '../../assets/icons/github-logo.svg';

class Footer {
  public render(): HTMLElement {
    const footerLogoImg = createElement({
      tag: 'img', classList: ['footer__logo'],
    }) as HTMLImageElement;

    footerLogoImg.src = footerLogoRs;
    footerLogoImg.alt = 'Rolling Scopes School';
    footerLogoImg.title = 'Rolling Scopes School';

    const footerLogoLink = createElement({ tag: 'a' }) as HTMLLinkElement;

    footerLogoLink.href = 'https://rs.school/js/';
    footerLogoLink.setAttribute('target', '_blank');
    footerLogoLink.setAttribute('rel', 'noopener');

    footerLogoLink.append(footerLogoImg);

    const footerCopyright = createElement({
      tag: 'span', classList: ['footer__copyright'], content: 'All Rights Reserved © Yoda`s team 2023',
    });

    const footerGithubWrap = createElement({
      tag: 'div', classList: ['footer__github-wrap'],
    });

    footerGithubWrap.append(
      this.getGitHubHLink('https://github.com/BondPV'),
      this.getGitHubHLink('https://github.com/marinastepanchuk'),
      this.getGitHubHLink('https://github.com/Alesia-V175'),
    );

    const footer = createElement({
      tag: 'footer', classList: ['footer'],
    });

    footer.append(footerLogoLink, footerCopyright, footerGithubWrap);

    return footer;
  }

  private getGitHubHLink(url: string): HTMLLinkElement {
    const footerGithubLink1 = createElement({
      tag: 'a', classList: ['footer__github'],
    }) as HTMLLinkElement;
    footerGithubLink1.href = url;
    footerGithubLink1.setAttribute('target', '_blank');
    footerGithubLink1.setAttribute('rel', 'noopener');
    footerGithubLink1.append(this.getGithubImage());
    return footerGithubLink1;
  }

  private getGithubImage(): HTMLImageElement {
    const footerGithubLogo = createElement({
      tag: 'img', classList: ['footer__github-logo'],
    }) as HTMLImageElement;

    footerGithubLogo.src = footerLogoGithub;
    footerGithubLogo.alt = 'GitHub';
    footerGithubLogo.title = 'GitHub';
    return footerGithubLogo;
  }
}

export default Footer;
