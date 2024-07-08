import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/storeHooks";

export interface ModalState {
    name: string | null;
}

const initialState: ModalState = {
    name: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        show: (state, actions: PayloadAction<string>) => {
            state.name = actions.payload;
        },
        hide: (state) => {
            state.name = null;
        },
    },
});

export const { hide, show } = modalSlice.actions;

export const useModal = () => useAppSelector((state) => state.modalReducer);

export default modalSlice.reducer;
