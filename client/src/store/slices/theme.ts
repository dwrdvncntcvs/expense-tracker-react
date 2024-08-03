import { ColorWay, Theme } from "@_types/theme";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "@store/queries/user";

const themes: Theme = {
    default: {
        name: "theme-default",
        primary: "#164863",
        secondary: "#427d9d",
        tertiary: "#9bbec8",
        quaternary: "#fff",
    },
    retro: {
        name: "theme-retro",
        primary: "#ff8225",
        secondary: "#b43f3f",
        tertiary: "#173b45",
        quaternary: "#f8eded",
    },
    "ultra-violet": {
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
    army: {
        name: "theme-army",
        primary: "#1A3636",
        secondary: "#40534C",
        tertiary: "#677D6A",
        quaternary: "#D6BD98",
    },
    github: {
        name: "theme-github",
        primary: "#2fbb4f",
        secondary: "#0d74e7",
        tertiary: "#24292d",
        quaternary: "#2b3137",
    },
};

export interface ThemeState {
    name: string;
    themes: Theme;
    color: ColorWay;
}

const initialState: ThemeState = {
    name: "theme-default",
    themes,
    color: themes.default,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, actions: PayloadAction<string>) => {
            state.name = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.isAuthenticated.matchFulfilled,
                (state, action) => {
                    state.name = `theme-${action.payload.user.themeType}`;
                }
            )
            .addMatcher(userApi.endpoints.signOut.matchFulfilled, (state) => {
                state.name = "theme-default";
            });
    },
});

export const useTheme = () => useAppSelector((state) => state.themeReducer);

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
