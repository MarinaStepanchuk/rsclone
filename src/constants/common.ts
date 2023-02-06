export const LANG_ATTRIBUTE = 'lang';

export const RegularExpressions = {
  Email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/gm,
  Name: /^([а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,}[ ][а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,}|[а-яА-Яa-zA-Z0-9-!@#$%^&*]{3,})/gm,
  Password: /^[0-9a-zA-Z-!@#$%^&*]{5,}/gm,
};
