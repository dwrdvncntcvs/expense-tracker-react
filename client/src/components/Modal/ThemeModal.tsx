import { ColorWay, ThemeType } from "@_types/theme";
import { capitalize } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useUpdateUserThemeMutation } from "@store/queries/user";
import { hide } from "@store/slices/modal";
import { hideAll, success } from "@store/slices/toast";
import { FC } from "react";

interface ThemModalProps {
    color?: ColorWay;
    themeType?: ThemeType;
}

const ThemeModal: FC<ThemModalProps> = ({ color, themeType }) => {
    const dispatch = useAppDispatch();
    const [updateUserTheme] = useUpdateUserThemeMutation();

    const toasts = ["success", "warning", "info", "error"];

    const toastOutlineColors = {
        error: "outline-failure",
        success: "outline-success",
        warning: "outline-warning",
        info: "outline-blue-400",
    };

    return (
        <Modal title="Sample" name="theme-modal" options={{ isCustom: true }}>
            <div
                style={{ backgroundColor: color?.quaternary }}
                className="w-[800px] h-[400px]  rounded-xl overflow-hidden relative"
            >
                <div className="h-10 w-1/2 mx-auto flex items-center justify-between">
                    <div
                        style={{ backgroundColor: color?.primary }}
                        className="h-6 w-6 rounded-full"
                    ></div>
                    <div className="flex items-center gap-2">
                        {Array.from(Array(4)).map((_, i) => (
                            <div
                                style={{
                                    backgroundColor:
                                        i === 1
                                            ? color?.primary
                                            : color?.secondary,
                                }}
                                key={i}
                                id={i.toString()}
                                className={`${
                                    i === 1 ? "h-5 w-5" : "h-4 w-4"
                                } rounded-full`}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="h-full w-1/2 mx-auto flex flex-col gap-4 py-2 ">
                    {Array.from(Array(4)).map((_, j) => (
                        <div key={j}>
                            <div className="flex h-4 w-full justify-between items-center">
                                <div
                                    style={{ backgroundColor: color?.primary }}
                                    className="w-20 h-3 rounded-xl"
                                ></div>
                                <div className="flex items-center gap-1">
                                    {Array.from(Array(2)).map((_, i) => (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    color?.secondary,
                                            }}
                                            key={i}
                                            id={i.toString()}
                                            className={" h-4 w-4 rounded-full"}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-1 items-center justify-center p-2 w-full">
                                {Array.from(Array(12)).map((_, i) => (
                                    <div
                                        style={{
                                            backgroundColor: color?.tertiary,
                                        }}
                                        key={i}
                                        id={i.toString()}
                                        className={" h-7 w-7 rounded-full"}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute w-44 max-h-full flex flex-col gap-3 bottom-0 left-0 p-4">
                    {toasts.map((toastType) => (
                        <div
                            style={{ backgroundColor: color?.primary }}
                            className={`bg-primary w-full h-8 rounded-md outline outline-offset-2 ${
                                toastOutlineColors[
                                    toastType as keyof typeof toastOutlineColors
                                ]
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="p-4 px-1 flex items-center justify-between">
                <p
                    style={{ color: color?.primary || "" }}
                    className="font-bold text-xl mx-10"
                >
                    {color?.name
                        ? capitalize(color?.name, "-")
                              .split(" ")
                              .reverse()
                              .join(" ")
                        : null}
                </p>
                <ActionButtons
                    className="p-2 px-4"
                    options={[
                        {
                            type: "button",
                            bgColor: "tertiary",
                            color: "plain",
                            label: "Cancel",
                            onClick: () => {
                                dispatch(hide());
                            },
                        },
                        {
                            type: "button",
                            bgColor: "primary",
                            color: "plain",
                            label: "Apply Theme",
                            onClick: async () => {
                                if (!color?.name || !themeType) return;

                                const response = await updateUserTheme(
                                    themeType
                                );

                                dispatch(hide());

                                dispatch(hideAll());
                                if (response?.error) {
                                    dispatch(
                                        success({
                                            message: `${capitalize(
                                                themeType,
                                                "-"
                                            )} theme cannot be selected`,
                                        })
                                    );
                                }

                                dispatch(
                                    success({
                                        message: `${capitalize(
                                            themeType,
                                            "-"
                                        )} theme selected`,
                                    })
                                );
                            },
                        },
                    ]}
                />
            </div>
        </Modal>
    );
};

export default ThemeModal;
