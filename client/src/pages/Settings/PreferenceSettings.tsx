import { ColorWay, ThemeType } from "@_types/theme";
import { capitalize } from "@common/utils/str";
import { ThemeModal } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import { show } from "@store/slices/modal";
import { useTheme } from "@store/slices/theme";
import { FC, useState } from "react";
import { HiSwatch } from "react-icons/hi2";

const PreferenceSettings: FC = () => {
    const [selectedColorWay, setSelectedColorWay] = useState<
        ColorWay | undefined
    >(undefined);
    const [selectedKey, setSelectedKey] = useState<ThemeType | undefined>(
        undefined
    );

    const dispatch = useAppDispatch();

    const { themes, name } = useTheme();

    return (
        <SettingsContentLayout title="Preferences">
            <div className="flex flex-col gap-4">
                <h3 className="text-primary text-xl font-semibold flex gap-2 items-center">
                    <span>
                        <HiSwatch size={20} />
                    </span>
                    Color Theme
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    {Object.keys(themes).map((key) => {
                        const theme = themes[key as ThemeType];

                        return (
                            <button
                                id={theme.name}
                                style={{
                                    backgroundColor: theme.primary,
                                }}
                                className={`${
                                    `${theme.name}` === name
                                        ? "pointer-events-none outline outline-4 outline-offset-2 outline-primary"
                                        : ""
                                } flex flex-col items-center gap-5 shadow-md rounded-xl p-4`}
                                key={key}
                                onClick={async () => {
                                    console.log(key);

                                    setSelectedColorWay(theme);
                                    setSelectedKey(key as ThemeType);
                                    dispatch(show("theme"));
                                }}
                            >
                                <div className="flex justify-center gap-2 items-center">
                                    {Object.keys(theme)
                                        .filter((key) => key !== "name")
                                        .map((_key, i) => (
                                            <div
                                                key={`${_key}-${key}`}
                                                className={`rounded-full  ${
                                                    i < 1
                                                        ? "border-4 border-plain h-14 w-14"
                                                        : "h-10 w-10"
                                                }`}
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
                                    className={`text-lg self-end rounded-full text-plain`}
                                >
                                    {capitalize(key, "-")}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            <ThemeModal color={selectedColorWay} themeType={selectedKey} />
        </SettingsContentLayout>
    );
};

export default PreferenceSettings;
