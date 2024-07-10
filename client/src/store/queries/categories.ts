import { ICategory } from "@_types/Settings/category";
import api from "./api";

const categoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: (_: void) => ({ url: "/categories", method: "get" }),
            providesTags: ["categories"],
        }),
        createCategory: build.mutation({
            query: (category: ICategory) => ({
                url: "/categories",
                method: "post",
                data: category,
            }),
            invalidatesTags: ["categories"],
        }),
        deleteCategory: build.mutation({
            query: (categoryId: string) => ({
                url: `/categories/${categoryId}`,
                method: "delete",
            }),
            invalidatesTags: ["categories"],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} = categoriesApi;

export default categoriesApi;
