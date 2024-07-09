import { ICategory } from "@_types/Settings/category";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        resetSettings: (state) => {
            state.categories = [];
        },
    },
});

export const { createCategory, removeCategory, setCategories, resetSettings } =
    settingsSlice.actions;

export const useSettings = () =>
    useAppSelector((state) => state.settingsReducer);

export default settingsSlice.reducer;
