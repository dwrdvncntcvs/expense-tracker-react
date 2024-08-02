import { Theme } from "@_types/theme";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const themes: Theme = {
    default: {
        name: "theme-default",
        primary: "#164863",
        secondary: "#427d9d",
        tertiary: "#9bbec8",
        quaternary: "#ddf2fd",
    },
    retro: {
        name: "theme-retro",
        primary: "#ff8225",
        secondary: "#b43f3f",
        tertiary: "#173b45",
        quaternary: "#f8eded",
    },
    ultra_violet: {
        name: "theme-ultra-violet",
        primary: "#201e43",
        secondary: "#134b70",
        tertiary: "#508c9b",
        quaternary: "#eeeeee",
    },
    forest: {
        name: "theme-forest",
        primary: "#1A5319",
        secondary: "#508D4E",
        tertiary: "#80AF81",
        quaternary: "#D6EFD8",
    },
};

export interface ThemeState {
    name: string;
    themes: Theme;
}

const initialState: ThemeState = {
    name: "theme-default",
    themes,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, actions: PayloadAction<string>) => {
            state.name = actions.payload;
        },
    },
});

export const useTheme = () => useAppSelector((state) => state.themeReducer);

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
