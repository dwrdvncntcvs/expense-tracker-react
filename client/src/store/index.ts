import { configureStore } from "@reduxjs/toolkit";
import api from "./queries/api";
import modalReducer from "./slices/modal";
import settingsReducer from "./slices/settings";
import toastReducer from "./slices/toast";
import userReducer from "./slices/user";
import expenseReducer from "./slices/expense";
import chartReducer from "./slices/chart";
import themeReducer from "./slices/theme";

const store = configureStore({
    reducer: {
        toastReducer,
        modalReducer,
        userReducer,
        settingsReducer,
        expenseReducer,
        chartReducer,
        themeReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
