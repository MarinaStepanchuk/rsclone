import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ICategory } from '../../types/interfaces';
import { LANG_ATTRIBUTE, LocalStorageKey } from '../../constants/common';
import AppState from '../../constants/appState';
import { SvgIcons } from '../../constants/svgMap';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';
import { Categories } from '../../constants/tests';
import BaseCreater from '../BaseCreater/BaseCreater';

class CreatorCategory extends BaseCreater {
  constructor(private getCategory: () => ICategory[], private updateCategoriesBlock: () => void) {
    super();
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
    this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).user.currency;
    super.init();
    super.fill();
    this.addListeners();
  }

  public render(): HTMLElement {
    const submit = this.submit as HTMLButtonElement;
    submit.innerText = Dictionary[this.lang].createCategorySubmit;
    submit.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    submit.setAttribute(Attribute.key, DictionaryKeys.createCategorySubmit);

    const formTitle = this.formTitle as HTMLElement;
    formTitle.innerText = Dictionary[this.lang].createCategoryTitle;
    formTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    formTitle.setAttribute(Attribute.key, DictionaryKeys.createCategoryTitle);

    const itemNameTitle = this.itemNameTitle as HTMLElement;
    itemNameTitle.innerText = Dictionary[this.lang].createCategoryName;
    itemNameTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemNameTitle.setAttribute(Attribute.key, DictionaryKeys.createCategoryName);

    const itemBalanceTitle = this.itemBalanceTitle as HTMLElement;
    itemBalanceTitle.innerText = Dictionary[this.lang].createCategoryLimit;
    itemBalanceTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemBalanceTitle.setAttribute(Attribute.key, DictionaryKeys.createCategoryLimit);

    (this.icon as HTMLElement).innerHTML = SvgIcons.category.base;

    return this.modalWrapper as HTMLElement;
  }

  private addListeners(): void {
    this.modalWrapper?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (
        targetElement.classList.contains(ClassMap.creater.createWrapper)
        || targetElement.classList.contains(ClassMap.closeModalButton)
        || targetElement.classList.contains(ClassMap.closeLine)
      ) {
        this.modalWrapper?.remove();
      }
    });

    this.inputName?.addEventListener('input', () => {
      const { value } = this.inputName as HTMLInputElement;

      if (value.length > 0) {
        (this.submit as HTMLButtonElement).disabled = false;
      } else {
        (this.submit as HTMLButtonElement).disabled = true;
      }

      const categories = this.getCategory();

      categories.forEach((item) => {
        if (item.category === value) {
          (this.submit as HTMLButtonElement).disabled = true;
          showErrorValidationMessage(this.inputName as HTMLInputElement, Dictionary[this.lang].errorMessageCategoryExists);
        } else {
          (this.submit as HTMLButtonElement).disabled = false;
          removeErrorValidationMessage(this.inputName as HTMLInputElement);
        }
      });
    });

    this.form?.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.creater.createSubmit)
        && (this.submit as HTMLButtonElement).disabled === false
      ) {
        event.preventDefault();

        const idIcon = (this.icon as HTMLElement).getElementsByTagName('svg')[0].id.split('-')[1];

        const data: ICategory = {
          category: (this.inputName as HTMLInputElement).value,
          sum: Number((this.inputBalance as HTMLInputElement).value),
          icon: idIcon,
        };

        this.addCategoryToDatabase(data);

        this.updateCategoriesBlock();

        this.modalWrapper?.remove();
      }
    });
  }

  private addCategoryToDatabase(data: ICategory): void {
    // тестово
    console.log(data);
    Categories.push(data);
    // добавляем в базу новый счет
  }
}

export default CreatorCategory;
