import { Attribute, ClassMap } from '../../constants/htmlConstants';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ICategory } from '../../types/interfaces';
import { LANG_ATTRIBUTE, LocalStorageKey } from '../../constants/common';
import AppState from '../../constants/appState';
import showErrorValidationMessage from '../../utils/showErrorValidationMessage';
import removeErrorValidationMessage from '../../utils/removeErrorValidationMessage';
import BaseCreater from '../BaseCreater/BaseCreater';
import { SvgIcons } from '../../constants/svgMap';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import createElement from '../../utils/createElement';
import SvgModal from '../SvgModal/SvgModal';
import WalletExpenseModal from '../WalletExpenseModal/WalletExpenseModal';

class UpdaterCategory extends BaseCreater {
  constructor(private category: ICategory, private updateCategoriesBlock: () => void, private updateAccountsBlock: () => void) {
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
    submit.innerText = Dictionary[this.lang].updateCategorySubmit;
    submit.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    submit.setAttribute(Attribute.key, DictionaryKeys.updateCategorySubmit);

    const formTitle = this.formTitle as HTMLElement;
    formTitle.innerText = Dictionary[this.lang].updateCategoryTitle;
    formTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    formTitle.setAttribute(Attribute.key, DictionaryKeys.updateCategoryTitle);

    const itemNameTitle = this.itemNameTitle as HTMLElement;
    itemNameTitle.innerText = Dictionary[this.lang].createCategoryName;
    itemNameTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemNameTitle.setAttribute(Attribute.key, DictionaryKeys.createCategoryName);

    (this.inputName as HTMLInputElement).value = this.category.category;
    (this.icon as HTMLElement).innerHTML = SvgIcons.category[this.category.icon];

    const itemBalanceTitle = this.itemBalanceTitle as HTMLElement;
    itemBalanceTitle.innerText = Dictionary[this.lang].addLimit;
    itemBalanceTitle.setAttribute(Attribute.dataLang, LANG_ATTRIBUTE);
    itemBalanceTitle.setAttribute(Attribute.key, DictionaryKeys.addLimit);
    const limit = this.inputBalance as HTMLInputElement;
    limit.value = String(this.category.limit) || '';

    const deleteButton = createElement({
      tag: 'button',
      classList: [ClassMap.updater.deleteButton],
      key: DictionaryKeys.deleteCategoryButton,
      content: Dictionary[this.lang].deleteCategoryButton,
    }) as HTMLButtonElement;

    const createIncome = createElement({
      tag: 'button',
      classList: [ClassMap.updater.createButton],
      key: DictionaryKeys.createExpenseButton,
      content: Dictionary[this.lang].createExpenseButton,
    }) as HTMLButtonElement;

    submit.before(createIncome, deleteButton);

    return this.modalWrapper as HTMLElement;
  }

  private addListeners(): void {
    this.inputName?.addEventListener('input', async () => {
      const { value } = this.inputName as HTMLInputElement;

      if (value.length > 0) {
        (this.submit as HTMLButtonElement).disabled = false;
      } else {
        (this.submit as HTMLButtonElement).disabled = true;
      }

      const categories = await this.getCategories();
      let matchFound = false;

      categories.forEach((item) => {
        if (item.category === value && value !== this.category.category) {
          matchFound = true;
        }
      });

      if (matchFound) {
        (this.submit as HTMLButtonElement).disabled = true;
        showErrorValidationMessage(this.inputName as HTMLInputElement, Dictionary[this.lang].errorMessageAccountExists);
      } else {
        (this.submit as HTMLButtonElement).disabled = false;
        removeErrorValidationMessage(this.inputName as HTMLInputElement);
      }

      if (value === '') {
        (this.submit as HTMLButtonElement).disabled = true;
      }
    });

    this.inputBalance?.addEventListener('input', () => {
      (this.submit as HTMLButtonElement).disabled = false;
    });

    this.form?.addEventListener('click', async (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains(ClassMap.creater.createSubmit)
        && (this.submit as HTMLButtonElement).disabled === false
      ) {
        event.preventDefault();

        const idIcon = (this.icon as HTMLElement).getElementsByTagName('svg')[0].id.split('-')[1];

        const data: ICategory = this.category.key && this.category.category === (this.inputName as HTMLInputElement).value ? {
          category: (this.inputName as HTMLInputElement).value,
          icon: idIcon,
        } : {
          category: (this.inputName as HTMLInputElement).value,
          icon: idIcon,
          key: '',
        };

        const limit = (this.inputBalance as HTMLInputElement).value;
        if (limit) {
          data.limit = Number(limit);
        }

        await this.updateCategoryToDatabase(data);

        this.updateCategoriesBlock();

        this.modalWrapper?.remove();
      }

      if (targetElement.classList.contains(ClassMap.updater.deleteButton)
      ) {
        await this.deleteCategory();

        this.updateCategoriesBlock();

        this.modalWrapper?.remove();
      }

      if (targetElement.classList.contains(ClassMap.updater.createButton)
      ) {
        event.preventDefault();

        const section = document.querySelector(`.${ClassMap.mainContent}`);
        section?.append(await new WalletExpenseModal(this.category, this.updateCategoriesBlock, this.updateAccountsBlock).render());
      }

      if (targetElement.closest(`.${ClassMap.creater.createIcon}`)) {
        const section = document.querySelector(`.${ClassMap.mainContent}`);
        section?.append(new SvgModal(SvgIcons.category).render());
      }
    });
  }

  private async updateCategoryToDatabase(data: ICategory): Promise<ICategory | null> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const { _id: id } = this.category;
    const changedCategory: ICategory | null = await RequestApi.update(Endpoint.CATEGORY, userToken, id as string, data);
    return changedCategory || null;
  }

  private async getCategories(): Promise<ICategory[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const categoriesData: ICategory[] = await RequestApi.getAll(Endpoint.CATEGORY, userToken);
    return categoriesData;
  }

  private async deleteCategory(): Promise<void> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const { _id: id } = this.category;
    await RequestApi.delete(Endpoint.CATEGORY, userToken, id as string);
  }
}

export default UpdaterCategory;
