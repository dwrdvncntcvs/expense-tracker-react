import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "@_types/auth";
import { useAppSelector } from "@hooks/storeHooks";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isAuthenticatedAction: (state, actions: PayloadAction<boolean>) => {
            state.isAuthenticated = actions.payload;
        },
        userAction: (state, actions: PayloadAction<User | null>) => {
            state.user = actions.payload;
        },
    },
});

export const { isAuthenticatedAction, userAction } = userSlice.actions;

export default userSlice.reducer;

export const useUser = () => useAppSelector((state) => state.userReducer);
