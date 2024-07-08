import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toast";
import modalReducer from "./slices/modal"

const store = configureStore({
    reducer: {
        toastReducer,
        modalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
