export interface ColorWay {
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
}

export type ThemeType = "default" | "retro" | "ultra_violet" | "forest";

export type Theme = {
    [x in ThemeType]: ColorWay;
};
