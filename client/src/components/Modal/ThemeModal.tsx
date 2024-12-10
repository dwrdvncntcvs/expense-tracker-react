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
    HiInformationCircle,
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

    const handleSelectTheme = async () => {
        if (!color?.name || !themeType) return;

        const response = await updateUserTheme(themeType);

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
                message: `${capitalize(themeType, "-")} theme selected`,
            })
        );
    };

    return (
        <Modal title="Sample" name="theme" options={{ isCustom: true }}>
            <div
                style={{ backgroundColor: color?.quaternary }}
                className="md:w-[800px] w-screen md:h-[400px] h-auto  md:rounded-xl overflow-hidden relative"
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
                <div className="md:h-12 h-9 w-1/2 mx-auto flex items-center justify-between">
                    <div
                        style={{ backgroundColor: color?.primary }}
                        className="md:h-6 md:w-6 h-5 w-5 rounded-full"
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
                                    i === 1
                                        ? "md:h-5 md:w-5 h-4 w-4"
                                        : "md:h-4 md:w-4 h-3 w-3"
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
                                    className="md:w-16 w-14 md:h-4 h-3 rounded-xl"
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
                                            className={
                                                " md:h-4 md:w-4 h-2 w-2 rounded-full"
                                            }
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-1 items-center justify-center p-2 w-full flex-wrap">
                                {Array.from(Array(12)).map((_, i) => (
                                    <div
                                        style={{
                                            backgroundColor: color?.tertiary,
                                        }}
                                        key={i}
                                        id={i.toString()}
                                        className={
                                            " md:h-7 md:w-7 w-4 h-4 rounded-full"
                                        }
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Btn */}
                <div
                    style={{ backgroundColor: color?.primary }}
                    className="absolute md:w-12 md:h-12 w-7 h-7 bottom-4 right-4 rounded-full"
                ></div>

                {/* Toast */}
                <div className="absolute md:w-40 w-[100px] max-h-full flex flex-col md:gap-3 gap-2 bottom-0 left-0 md:p-4 p-2">
                    {toasts.map((toastType) => {
                        const Icon =
                            toastIcons[toastType as keyof typeof toastIcons];

                        return (
                            <div
                                key={toastType}
                                style={{
                                    backgroundColor: color?.tertiary,
                                }}
                                className={`bg-primary flex items-center justify-between px-2 w-full md:h-6 h-3 md:rounded-md rounded-sm outline outline-1 outline-offset-2 ${
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
            <div className="p-4 px-4 flex items-center justify-between bg-primary mt-4 md:rounded-xl">
                <p className="font-bold md:text-xl text-sm text-plain">
                    {color?.name
                        ? `${capitalize(
                              color?.name.replace("theme-", ""),
                              "-"
                          )} Theme`
                        : null}
                </p>
                <ActionButtons
                    className="p-2 px-4 md:text-auto text-sm"
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
                            onClick: handleSelectTheme,
                        },
                    ]}
                />
            </div>
        </Modal>
    );
};

export default ThemeModal;
