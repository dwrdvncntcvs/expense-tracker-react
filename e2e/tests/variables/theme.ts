export const themeTitle = {
    default: "Default",
    retro: "Retro",
    ultra_violet: "Ultra Violet",
    army: "Army",
    forest: "Forest",
    github: "Github",
};

export const themeKeys: ThemeKey[] = Object.keys(themeTitle) as ThemeKey[];

export type ThemeKey = keyof typeof themeTitle;
