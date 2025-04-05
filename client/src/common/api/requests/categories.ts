import { ICategory, ICreateCategoryWithoutUser } from '@_types/Settings/category';
import axios from '..';

const getCategories = async () => {
  const response = await axios.get('/categories');

  const data = response.data.data as ICategory[];

  return {
    data,
    status: response.status,
  };
};

const createCategories = async (category: ICreateCategoryWithoutUser) => {
  const response = await axios.post('/categories', JSON.stringify(category));

  const data = response.data.data as ICategory;

  return {
    data,
    status: response.status,
  };
};

const deleteCategory = async (id: string) => {
  const response = await axios.delete(`/categories/${id}`);

  const data = response.data.data;

  return {
    data,
    status: response.status,
  };
};

const checkCategoryUsage = async (id: string) => {
  const response = await axios.get(`/categories/${id}/used`);

  const data = response.data.data;

  return {
    data,
    status: response.status,
  };
};
export default {
  getCategories,
  createCategories,
  deleteCategory,
  checkCategoryUsage,
};
