import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type ToastType = "error" | "info" | "success" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    timeout: number;
}

type AddToastMethod = (message: string, timeout?: number) => void;

interface IToastContext {
    toasts: Toast[];
    info: AddToastMethod;
    success: AddToastMethod;
    error: AddToastMethod;
    warning: AddToastMethod;
    hide: (id: string) => void;
}

const ToastContext = createContext<IToastContext>({
    toasts: [],
    success: () => {},
    info: () => {},
    error: () => {},
    warning: () => {},
    hide: () => {},
});

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Toast) => {
        setToasts((val) => [...val, toast]);
    };

    const success = (message: string, timeout: number = 2000) =>
        addToast({
            id: `${toasts.length + 1}`,
            message,
            timeout,
            type: "success",
        });

    const error = (message: string, timeout: number = 2000) =>
        addToast({
            id: `${toasts.length + 1}`,
            message,
            timeout,
            type: "error",
        });

    const warning = (message: string, timeout: number = 2000) =>
        addToast({
            id: `${toasts.length + 1}`,
            message,
            timeout,
            type: "warning",
        });

    const info = (message: string, timeout: number = 2000) =>
        addToast({
            id: `${toasts.length + 1}`,
            message,
            timeout,
            type: "info",
        });

    const hide = (id: string) => {
        setToasts((_toasts) => _toasts.filter((val) => val.id !== id));
    };

    useEffect(() => {
        const timeout = null;

        toasts.forEach((toast) => {
            setTimeout(() => {
                hide(toast.id);
            }, toast.timeout);
        });

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [toasts]);

    return (
        <ToastContext.Provider
            value={{ toasts, success, error, warning, info, hide }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const toast = useContext(ToastContext);

    if (!toast) {
        throw new Error("You can't use useToast outside of its provider");
    }

    return toast;
};

export default ToastProvider;
