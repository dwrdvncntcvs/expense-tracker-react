import { ICategory } from '@_types/Settings/category';
import api from './api';

const categoriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<any, void>({
      query: (_: void) => ({ url: '/categories', method: 'get' }),
      providesTags: ['categories'],
    }),
    createCategory: build.mutation({
      query: (category: ICategory) => ({
        url: '/categories',
        method: 'post',
        data: category,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: build.mutation({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: 'delete',
      }),
      invalidatesTags: ['categories'],
    }),
    checkCategoryUsage: build.query<{ data: { isUsed: boolean } }, string>({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}/used`,
        method: 'get',
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useCheckCategoryUsageQuery,
} = categoriesApi;

export default categoriesApi;
