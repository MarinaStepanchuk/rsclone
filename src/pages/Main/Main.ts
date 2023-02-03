import './Main.styles.scss';
import { Path } from '../../types/enums';
import createElement from '../../utils/createElement';
import { dictionary, DictionaryKeys } from '../../constants/dictionary';

// язык приходит с сервера
const lang = 'EN';

class Main {
  public render(): void {
    // forTest
    // так создаются элементы через функцию createElement, тэг - обязателен, остальные нет
    // класс лист это массив, он , id  хранится в htmlConstan
    // если элемент будет иметь перевод, то придумываем ему уникальный идентификатор, и затем 1.записываем его в файл dictionary в DictionaryKeys, например transition и как минимум в константу dictionary в графу RU, указывая контекст 2. контент в функции записываем как content: dictionary[lang].transition, key записываем как key: DictionaryKeys.transition (да, неудобно, как будто повторяемся но избегаем магических строк)
    // если элемент не будет переводиться то не записываем ему параметр key, а в content просто пишем нужный текст
    // Обратите внимание,что возвращает HTMLElement. В случае ссылок нужно после функции присвоить as HTMLLinkElement, для кнопок HTMLButtonElement, для input HTMLInputElement, для формы HTMLFormElement,чтобы пользоваться их спец. свойствами

    const p = createElement({
      tag: 'p', classList: ['text'], content: 'Я стартовая страница', id: '12',
    });
    const button = createElement({ tag: 'button', key: DictionaryKeys.transition, content: dictionary[lang].transition }) as HTMLButtonElement;
    const a = createElement({ tag: 'a', content: 'переход' }) as HTMLLinkElement;
    // таким образом удаляются все текущие дочерние элементы и вставляются свои
    document.body.replaceChildren(p, button, a);
    // внутренняя ссылка
    a.href = Path.DASHBOARD;
    // внешняя ссылка должна начинаться с http
    a.href = 'https://learn.javascript.ru/destructuring-assignment';
    // кнопка, которая переключает страницу
    button.setAttribute('data-link', Path.DASHBOARD);
    // кнопка,которая не переключает страницу НЕ должна иметь атрибута data-link
  }
}

export default Main;
