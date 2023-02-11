import Path from '../types/enums';

export const ClassMap = {
  alertMessage: {
    wrapper: 'alert-wrapper',
    error: 'alert-wrapper_error',
    success: 'alert-wrapper_success',
  },
  authorization: {
    section: 'authorization',
    wrapper: 'authorization__wrapper',
    imgContainer: 'authorization__greeting-images',
    title: 'authorization__header',
    greeting: 'authorization__greeting',
    slider: 'authorization__slider',
    slide: 'authorization__slider__slide',
    form: 'authorization__form',
    formItem: 'authorization__form__input',
    inputEmail: 'authorization__form__email',
    inputPassword: 'authorization__form__password',
    registration: 'authorization__form__registration',
    registrationText: 'authorization__form__registration__text',
    registrationLink: 'authorization__form__registration__link',
    signInButton: 'authorization__form_submit',
  },
  registration: {
    wrapper: 'registration-wrapper',
    form: 'registration-form',
    formTitle: 'registration-form__title',
    formItem: 'registration-form__input',
    inputEmail: 'registration-form__email',
    inputName: 'registration-form__name',
    inputPassword: 'registration__form__password',
    selectCurrency: 'registration-form__currency',
    inputConfirmPassword: 'registration__form__confirm-password',
    submit: 'registration-form_submit',
  },
  support: {
    wrapper: 'support-wrapper',
    form: 'support-form',
    formTitle: 'support-form__title',
    formItem: 'support-form__input',
    inputMessage: 'support-form__message',
    submit: 'support-form_submit',
  },
  mode: {
    dark: {
      background: 'dark-mode-background',
      backgroundMenu: 'dark-mode-menu-background',
      title: 'dark-mode-title',
      font: 'dark-mode-font',
      modal: 'dark-mode-modal-background',
      modalTitle: 'dark-mode-modal-title',
    },
    light: {
      background: 'light-mode-background',
      backgroundMenu: 'light-mode-menu-background',
      title: 'light-mode-title',
      font: 'light-mode-font',
      modal: 'light-mode-modal-background',
      modalTitle: 'light-mode-modal-title',
    },
  },
  passwordIcon: 'password-icon',
  showPassword: 'show-password',
  closeModalButton: 'close-modal',
  closeLine: 'close-modal__line',
  errorValidation: 'error-validation-message',
  show: 'show',
  hide: 'hide',
  parentInput: 'form__item',
  wrapperPassword: 'wrapper-password',
  footer: {
    footer: 'footer',
    footerLogo: 'footer__logo',
    footerCopyright: 'footer__copyright',
    footerGithubWrap: 'footer__github-wrap',
    footerGithub: 'footer__github',
    footerGithubLogo: 'footer__github-logo',
  },
  menu: {
    navWrap: 'menu__nav-wrap',
    menuSection: 'main__menu',
    logo: 'menu__logo',
    logoTitle: 'menu__logo-title',
    logoWrap: 'menu__logo-wrap',
    navList: 'menu__nav',
    navItem: 'menu__nav-item',
    navIcon: 'menu__nav-icon',
    navButton: 'menu__nav-button',
    navButtonActive: 'menu__nav-button_active',
    menuItem: 'menu__item',
    menuList: 'menu__list',
    userImg: 'user__img',
    userWrap: 'user__wrap',
    user: 'user',
    switchInput: 'menu__input',
    switchSpan: 'menu__button-span',
    switchLabel: 'menu__switch',
    switchWrap: 'switch-wrap',
  },
  main: 'main',
  mainContent: 'main__content',
};

export const ClassNameList = {
  menu: {
    navButton: '.menu__nav-button',
  },
  mainContent: '.main__content',
  main: '.main',
  mainMenu: '.main__menu',
  footer: '.footer',
};

export const Currency = ['USD', 'RUB', 'BYN', 'EUR'];

export const Mode = {
  key: 'mode',
  darkValue: 'dark',
  lightValue: 'light',
};

export const ImagePath = {
  menu: {
    dashboardIcon: '../../assets/icons/dashboard.svg',
    walletIcon: '../../assets/icons/wallet-icon.svg',
    analyticsIcon: '../../assets/icons/bar-line-icon.svg',
    accountIcon: '../../assets/icons/user-icon.svg',
    supportIcon: '../../assets/icons/help-circle.svg',
    darkModeIcon: '../../assets/icons/moon-01.svg',
    logoutIcon: '../../assets/icons/logout.svg',
  },
  footer: {
    footerLogoRs: '../../assets/icons/rs-school-js.svg',
    footerLogoGithub: '../../assets/icons/github-logo.svg',
  },
};

export const Title = {
  rsSchool: 'Rolling Scopes School',
  copyright: 'All Rights Reserved © Yoda`s team 2023',
  github: 'GitHub',
  logo: 'MAPmoney',
};

export const PageLink = {
  rsSchool: 'https://rs.school/js/',
  firstGithub: 'https://github.com/BondPV',
  secondGithub: 'https://github.com/marinastepanchuk',
  thirdGithub: 'https://github.com/Alesia-V175',
};

export const Attribute = {
  target: 'target',
  targetValue: '_blank',
  rel: 'rel',
  relValue: 'noopener',
  dataLink: 'data-link',
  checked: 'checked',
  inputCheckbox: 'checkbox',
};

export const MenuItem = {
  dashboard: 'Dashboard',
  darkMode: 'Dark Mode',
  support: 'Support',
  user: 'User Name',
  logout: 'Logout',
  wallet: 'My Wallet',
  analytics: 'Analytics',
  account: 'Account',
};

export const MenuNavItem = {
  dashboard: {
    path: Path.DASHBOARD,
    name: MenuItem.dashboard,
    image: ImagePath.menu.dashboardIcon,
  },
  wallet: {
    path: Path.WALLET,
    name: MenuItem.wallet,
    image: ImagePath.menu.walletIcon,
  },
  analytics: {
    path: Path.ANALYTICS,
    name: MenuItem.analytics,
    image: ImagePath.menu.analyticsIcon,
  },
  account: {
    path: Path.ACCOUNT,
    name: MenuItem.account,
    image: ImagePath.menu.accountIcon,
  },
};
