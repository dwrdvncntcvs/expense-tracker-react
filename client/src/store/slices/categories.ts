import { ICategory } from "@_types/Settings/category";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice } from "@reduxjs/toolkit";
import {
    createCategoryRequest,
    deleteCategoryRequest,
    getCategoryRequest,
} from "@store/thunk/categories";

export interface CategoryState {
    categories: ICategory[];
    loading: boolean;
    error: string | null | any;
}

const initialState: CategoryState = {
    categories: [],
    error: null,
    loading: false,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoryRequest.fulfilled, (state, actions) => {
                state.loading = false;
                state.categories = actions.payload.data;
                state.error = null;
            })
            .addCase(getCategoryRequest.rejected, (state, actions) => {
                state.error = actions.payload?.data.message;
                state.loading = false;
            });

        builder
            .addCase(createCategoryRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategoryRequest.fulfilled, (state, actions) => {
                state.loading = false;
                state.categories = [...state.categories, actions.payload.data];
                state.error = null;
            })
            .addCase(createCategoryRequest.rejected, (state, actions) => {
                state.error = actions.payload || actions.error;
                state.loading = false;
            });

        builder
            .addCase(deleteCategoryRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoryRequest.fulfilled, (state, actions) => {
                state.categories = state.categories.filter(
                    (val) => val.id !== actions.meta.arg
                );
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteCategoryRequest.rejected, (state, actions) => {
                state.error = actions.payload?.data.message;
                state.loading = false;
            });
    },
});

export const useCategory = () => {
    const state = useAppSelector((state) => state.categoriesReducer);

    return {
        ...state,
        getCategoryRequest,
        createCategoryRequest,
        deleteCategoryRequest,
    };
};

export default categorySlice.reducer;
