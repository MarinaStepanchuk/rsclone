import { ICategory, ICategoryUpdate } from '../types/interfaces';
import {
  REQUEST_URL,
  REQUEST_METOD,
  CONTENT_TYPE_JSON,
} from './serverConstants';

class CategoryApi {
  public static async createCategory(token: string, categoryData: ICategory): Promise<ICategory> {
    const url = `${REQUEST_URL.category}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.POST,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(categoryData),
      });

      const newCategory = await response.json();

      return newCategory;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async updateCategory(token: string, categoryData: ICategoryUpdate): Promise<ICategory> {
    const url = `${REQUEST_URL.category}/${categoryData._id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.PATCH,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
        body: JSON.stringify(categoryData),
      });

      const changedCategory = await response.json();

      return changedCategory;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async deleteCategory(token: string, id: string): Promise<void> {
    const url = `${REQUEST_URL.category}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.DELETE,
        headers: authorization,
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async getCategory(token: string, id: string): Promise<ICategory> {
    const url = `${REQUEST_URL.category}/${id}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: authorization,
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async getCategories(token: string): Promise<ICategory[]> {
    const url = `${REQUEST_URL.category}`;
    const authorization = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: REQUEST_METOD.GET,
        headers: Object.assign(authorization, CONTENT_TYPE_JSON),
      });

      const dataResponse: ICategory[] = await response.json();

      return dataResponse;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default CategoryApi;
