import { ICategory } from "@_types/Settings/category";
import { ITag } from "@_types/Settings/tag";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesApi from "@store/queries/categories";
import tagsApi from "@store/queries/tags";

export interface SettingsState {
    categories: ICategory[];
    tags: ITag[];
    searchTags: ITag[];
}

const initialState: SettingsState = {
    categories: [],
    tags: [],
    searchTags: [],
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setCategories: (state, actions: PayloadAction<ICategory[]>) => {
            state.categories = actions.payload;
        },
        createCategory: (state, actions: PayloadAction<ICategory>) => {
            state.categories = [...state.categories, actions.payload];
        },
        removeCategory: (state, actions: PayloadAction<string>) => {
            state.categories = state.categories.filter(
                (category) => category.id !== actions.payload
            );
        },
        resetTags: (state) => {
            state.tags = [];
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            categoriesApi.endpoints.getCategories.matchFulfilled,
            (state, actions) => {
                state.categories = actions.payload.data;
            }
        );
        builder.addMatcher(
            tagsApi.endpoints.getTags.matchFulfilled,
            (state, actions) => {
                const originalArgs = actions.meta.arg.originalArgs;
                if (originalArgs !== undefined && "search" in originalArgs) {
                    state.searchTags = actions.payload.data;
                } else state.tags = actions.payload.data;
            }
        );
    },
});

export const { createCategory, removeCategory, setCategories, resetTags } =
    settingsSlice.actions;

export const useSettings = () =>
    useAppSelector((state) => state.settingsReducer);

export default settingsSlice.reducer;
