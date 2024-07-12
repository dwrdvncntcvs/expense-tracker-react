import { ICategory } from "@_types/Settings/category";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesApi from "@store/queries/categories";

export interface SettingsState {
    categories: ICategory[];
}

const initialState: SettingsState = {
    categories: [],
};

const settingsSlice = createSlice({
    name: "categories",
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
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            categoriesApi.endpoints.getCategories.matchFulfilled,
            (state, actions) => {
                state.categories = actions.payload.data;
            }
        );
    },
});

export const { createCategory, removeCategory, setCategories } =
    settingsSlice.actions;

export const useSettings = () =>
    useAppSelector((state) => state.settingsReducer);

export default settingsSlice.reducer;
