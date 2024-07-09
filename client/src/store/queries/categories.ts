import { ICategory } from "@_types/Settings/category";
import {
    createCategory,
    removeCategory,
    setCategories,
} from "@store/slices/settings";
import api from "./api";

const categoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({ url: "/categories", method: "get" }),
            providesTags: ["categories"],
            onCacheEntryAdded: async (
                _: void,
                { cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) => {
                const data = await cacheDataLoaded;

                dispatch(setCategories(data.data.data));

                await cacheEntryRemoved;
            },
        }),
        createCategory: build.mutation({
            query: (category: ICategory) => ({
                url: "/categories",
                method: "post",
                data: category,
            }),
            invalidatesTags: ["categories"],
            onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
                const data = await cacheDataLoaded;
                dispatch(createCategory(data.data.data));
            },
        }),
        deleteCategory: build.mutation({
            query: (categoryId: string) => ({
                url: `/categories/${categoryId}`,
                method: "delete",
            }),
            invalidatesTags: ["categories"],
            onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
                const data = await cacheDataLoaded;

                dispatch(removeCategory(data.data.data.id));
            },
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} = categoriesApi;

export default categoriesApi;
