import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toast";
import modalReducer from "./slices/modal";
import userReducer from "./slices/user";
import { userApi } from "@store/queries/user";

const store = configureStore({
    reducer: {
        toastReducer,
        modalReducer,
        userReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
