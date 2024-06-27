import { FC } from "react";
import { useToast } from "../contexts/Toast";
import {
    HiCheckCircle,
    HiExclamationCircle,
    HiExclamationTriangle,
    HiInformationCircle,
} from "react-icons/hi2";
import { HiX } from "react-icons/hi";

const Toast: FC = () => {
    const { toasts, hide } = useToast();

    const toastTypeClass = {
        info: "bg-blue-900/30 border border-blue-900 text-blue-900",
        success: "bg-success/30 border border-success text-success",
        error: "bg-failure/30 border border-failure text-failure",
        warning: "bg-warning/30 border border-warning text-warning",
    };

    const toastIconByType = {
        info: HiInformationCircle,
        success: HiCheckCircle,
        error: HiExclamationCircle,
        warning: HiExclamationTriangle,
    };

    return (
        toasts.length > 0 && (
            <div className="fixed max-h-screen w-96 flex flex-col gap-2 right-0 bottom-0 p-4">
                {toasts.map((toast) => {
                    const Icon = toastIconByType[toast.type];
                    return (
                        <div
                            className={`p-2 rounded-lg flex gap-4 items-center relative ${
                                toastTypeClass[toast.type]
                            }`}
                            key={toast.id}
                        >
                            <Icon /> {toast.message}
                            <button
                                className="absolute top-2 right-2"
                                onClick={() => hide(toast.id)}
                            >
                                <HiX />
                            </button>
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default Toast;
