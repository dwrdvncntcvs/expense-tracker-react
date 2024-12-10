import { useAppDispatch } from "@hooks/storeHooks";
import { hide, useToast } from "@store/slices/toast";
import { FC, useEffect } from "react";
import { HiX } from "react-icons/hi";
import {
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineExclamationTriangle,
    HiOutlineInformationCircle,
} from "react-icons/hi2";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toasts]);

    const toastTypeClass = {
        info: "bg-tertiary text-primary outline outline-blue-400 outline-offset-2",
        success:
            "bg-tertiary text-primary outline outline-success outline-offset-2",
        error: "bg-tertiary text-primary outline outline-failure outline-offset-2",
        warning:
            "bg-tertiary text-primary outline outline-warning outline-offset-2",
    };

    const toastIconByType = {
        info: HiOutlineInformationCircle,
        success: HiOutlineCheckCircle,
        error: HiOutlineExclamationCircle,
        warning: HiOutlineExclamationTriangle,
    };

    return (
        toasts.length > 0 && (
            <div className="fixed max-h-screen w-96 outline- flex flex-col gap-4 left-0 md:bottom-0 bottom-16 p-4">
                {toasts.map((toast, i) => {
                    const Icon = toastIconByType[toast.type];
                    return (
                        <div
                            id={`${toast.type}-toast`}
                            className={`toast-item p-4 rounded border-1 flex gap-4 items-center relative ${
                                toastTypeClass[toast.type]
                            } ${i === toasts.length -1 ? "w-full" : "md:w-80 w-full"}`}
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
