import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toast";
import modalReducer from "./slices/modal";
import userReducer from "./slices/user";

const store = configureStore({
    reducer: {
        toastReducer,
        modalReducer,
        userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
