import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";
import settingsReducer from "./slices/settings";
import toastReducer from "./slices/toast";
import userReducer from "./slices/user";
import categoriesReducer from "./slices/categories";

const store = configureStore({
    reducer: {
        toastReducer,
        modalReducer,
        userReducer,
        settingsReducer,
        categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
