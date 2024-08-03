import { ColorWay, ThemeType } from "@_types/theme";
import { capitalize } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useUpdateUserThemeMutation } from "@store/queries/user";
import { hide } from "@store/slices/modal";
import { hideAll, success } from "@store/slices/toast";
import { FC } from "react";
import {
    HiCheckCircle,
    HiExclamationCircle,
    HiExclamationTriangle,
    HiInformationCircle
} from "react-icons/hi2";

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

    const toastIcons = {
        info: HiInformationCircle,
        success: HiCheckCircle,
        error: HiExclamationCircle,
        warning: HiExclamationTriangle,
    };

    return (
        <Modal title="Sample" name="theme-modal" options={{ isCustom: true }}>
            <div
                style={{ backgroundColor: color?.quaternary }}
                className="w-[800px] h-[400px] rounded-xl overflow-hidden relative"
            >
                {/* Browser */}
                <div className="bg-tertiary h-12 w-full flex-col ">
                    <div className="flex items-center justify-between px-4 h-1/2">
                        <div className="w-20 h-4 self-end bg-secondary rounded-t-lg"></div>
                        <div className="flex gap-1 items-center">
                            {Array.from(Array(3)).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-2 w-2 bg-primary rounded-full"
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center bg-secondary px-2 h-1/2 gap-4">
                        <div className="flex gap-1 items-center">
                            {Array.from(Array(3)).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-3 bg-primary rounded-sm"
                                ></div>
                            ))}
                        </div>
                        <div className="w-full h-4 bg-quaternary rounded-full"></div>
                        <div className="flex gap-1 items-center">
                            {Array.from(Array(6)).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-3 bg-primary rounded-sm"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="h-12 w-1/2 mx-auto flex items-center justify-between">
                    <div
                        style={{ backgroundColor: color?.primary }}
                        className="h-6 w-6 rounded-full"
                    ></div>
                    <div className="flex items-center gap-1">
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

                {/* Expenses */}
                <div className="h-full w-1/2 mx-auto flex flex-col gap-4 py-2 ">
                    {Array.from(Array(2)).map((_, j) => (
                        <div key={j}>
                            <div className="flex h-4 w-full justify-between items-center">
                                <div
                                    style={{ backgroundColor: color?.primary }}
                                    className="w-16 h-4 rounded-xl"
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

                {/* Create Btn */}
                <div
                    style={{ backgroundColor: color?.primary }}
                    className="absolute w-12 h-12 bottom-4 right-4 rounded-full"
                ></div>

                {/* Expenses */}
                <div className="absolute w-40 max-h-full flex flex-col gap-3 bottom-0 left-0 p-4">
                    {toasts.map((toastType) => {
                        const Icon =
                            toastIcons[toastType as keyof typeof toastIcons];

                        return (
                            <div
                                key={toastType}
                                style={{
                                    backgroundColor: color?.tertiary,
                                }}
                                className={`bg-primary flex items-center justify-between px-2 w-full h-6 rounded-md outline outline-1 outline-offset-2 ${
                                    toastOutlineColors[
                                        toastType as keyof typeof toastOutlineColors
                                    ]
                                }`}
                            >
                                <Icon size={11} color={color?.primary || ""} />
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: color?.primary }}
                                ></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="p-4 px-4 flex items-center justify-between bg-primary mt-4 rounded-xl">
                <p className="font-bold text-xl text-plain">
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
                            bgColor: "primary",
                            color: "plain",
                            label: "Cancel",
                            onClick: () => {
                                dispatch(hide());
                            },
                        },
                        {
                            type: "button",
                            bgColor: "secondary",
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
