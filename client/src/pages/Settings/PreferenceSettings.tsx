import { ColorWay, ThemeType } from "@_types/theme";
import { capitalize } from "@common/utils/str";
import { ThemeModal } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import SettingsSection from "@layouts/SettingsSection";
import { show } from "@store/slices/modal";
import { useTheme } from "@store/slices/theme";
import { FC, useState } from "react";
import { HiPaintBrush, HiSwatch } from "react-icons/hi2";

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
        <SettingsContentLayout icon={HiPaintBrush} title="Preferences">
            <SettingsSection title="Color Theme" icon={HiSwatch}>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
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
                                <div className="flex justify-center flex-wrap md:pt-0 pt-3 md:gap-2 items-center md:rounded-none rounded-lg overflow-auto">
                                    {Object.keys(theme)
                                        .filter((key) => key !== "name")
                                        .map((_key, i) => (
                                            <div
                                                key={`${_key}-${key}`}
                                                className={`md:rounded-full  ${
                                                    i < 1
                                                        ? "md:border-4 border-plain h-14 w-14"
                                                        : "md:h-10 md:w-10 h-14 w-14"
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
            </SettingsSection>

            <ThemeModal color={selectedColorWay} themeType={selectedKey} />
        </SettingsContentLayout>
    );
};

export default PreferenceSettings;
