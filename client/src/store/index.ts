import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toast";

const store = configureStore({
    reducer: {
        toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
