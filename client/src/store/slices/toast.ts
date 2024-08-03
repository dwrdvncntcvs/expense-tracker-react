import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { useAppSelector } from "@hooks/storeHooks";
import { generateRandomId } from "@common/utils/str";

type ToastType = "error" | "info" | "success" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    timeout?: number;
}

interface ToastPayload {
    message: string;
    timeout?: number;
}

export interface ToastState {
    toasts: Toast[];
}

const initialState: ToastState = {
    toasts: [],
};

const slice = createSlice({
    initialState,
    name: "toast",
    reducers: {
        success: (state, actions: PayloadAction<ToastPayload>) => {
            const { message, timeout = 5000 } = actions.payload;
            state.toasts = [
                ...state.toasts,
                {
                    type: "success",
                    message,
                    id: generateRandomId(20),
                    timeout,
                },
            ];
        },
        error: (state, actions: PayloadAction<ToastPayload>) => {
            const { message, timeout = 5000 } = actions.payload;
            state.toasts = [
                ...state.toasts,
                {
                    type: "error",
                    message,
                    id: generateRandomId(20),
                    timeout,
                },
            ];
        },
        warning: (state, actions: PayloadAction<ToastPayload>) => {
            const { message, timeout = 5000 } = actions.payload;
            state.toasts = [
                ...state.toasts,
                {
                    type: "warning",
                    message,
                    id: generateRandomId(20),
                    timeout,
                },
            ];
        },
        info: (state, actions: PayloadAction<ToastPayload>) => {
            const { message, timeout = 5000 } = actions.payload;
            state.toasts = [
                ...state.toasts,
                {
                    type: "info",
                    message,
                    id: generateRandomId(20),
                    timeout,
                },
            ];
        },
        hide: (state, actions: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(
                (toast) => toast.id !== actions.payload
            );
        },
        hideAll: (state) => {
            state.toasts = state.toasts.slice(state.toasts.length - 1);
        },
    },
});

export const { error, info, success, warning, hide, hideAll } = slice.actions;

export const useToast = () =>
    useAppSelector((state: RootState) => state.toastReducer);

export default slice.reducer;
