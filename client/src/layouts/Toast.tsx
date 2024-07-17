import { FC, useEffect } from "react";
import {
    HiCheckCircle,
    HiExclamationCircle,
    HiExclamationTriangle,
    HiInformationCircle,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineExclamationTriangle,
    HiOutlineInformationCircle,
} from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { useToast } from "@store/slices/toast";
import { hide } from "@store/slices/toast";
import { useAppDispatch } from "@hooks/storeHooks";

const Toast: FC = () => {
    const { toasts } = useToast();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        toasts.forEach((toast) => {
            const timeout = setTimeout(() => {
                dispatch(hide(toast.id));
            }, toast.timeout);
            timeouts.push(timeout);
        });

        return () => {
            if (timeouts.length) {
                timeouts.forEach((timeout) => clearTimeout(timeout));
            }
        };
    }, [toasts]);

    const toastTypeClass = {
        info: "bg-blue-300/10 border border-blue-300 text-blue-500",
        success: "bg-success/10 border border-success text-success",
        error: "bg-failure/10 border border-failure text-failure",
        warning: "bg-warning/10 border border-warning text-warning",
    };

    const toastIconByType = {
        info: HiOutlineInformationCircle,
        success: HiOutlineCheckCircle,
        error: HiOutlineExclamationCircle,
        warning: HiOutlineExclamationTriangle,
    };

    return (
        toasts.length > 0 && (
            <div className="fixed max-h-screen w-96 flex flex-col gap-4 left-0 bottom-0 p-4">
                {toasts.map((toast) => {
                    const Icon = toastIconByType[toast.type];
                    return (
                        <div
                            className={`p-4 rounded border-1 flex gap-4 items-center relative ${
                                toastTypeClass[toast.type]
                            }`}
                            key={toast.id}
                        >
                            <Icon size={30} />
                            <div className="w-full">
                                <p>{toast.message}</p>
                            </div>
                            <div className="flex items-center w-10 justify-center">
                                <button
                                    onClick={() => dispatch(hide(toast.id))}
                                >
                                    <HiX />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default Toast;
