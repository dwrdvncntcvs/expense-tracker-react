import { capitalize } from "@common/utils/str";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import { FC } from "react";

interface ColorWay {
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
}

type ThemeType = "default" | "retro" | "ultra_violet";

type Theme = {
    [x in ThemeType]: ColorWay;
};

const PreferenceSettings: FC = () => {
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
    };

    return (
        <SettingsContentLayout title="Preferences">
            <div className="flex flex-col gap-4">
                <h3>Color Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                    {Object.keys(themes).map((key) => {
                        const theme = themes[key as ThemeType];
                        return (
                            <button
                                className="flex flex-col items-center gap-5 shadow-md rounded-xl p-4 border"
                                key={key}
                            >
                                <div className="flex justify-center gap-2">
                                    {Object.keys(theme)
                                        .filter((key) => key !== "name")
                                        .map((_key) => (
                                            <div
                                                className="rounded-full h-10 w-10"
                                                style={{
                                                    background:
                                                        theme[
                                                            _key as keyof ColorWay
                                                        ],
                                                }}
                                            ></div>
                                        ))}
                                </div>
                                <p
                                    className="text-lg p-2 px-4 bg-plain rounded-full"
                                    style={{ color: theme.primary }}
                                >
                                    {capitalize(key, "_")}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </SettingsContentLayout>
    );
};

export default PreferenceSettings;
