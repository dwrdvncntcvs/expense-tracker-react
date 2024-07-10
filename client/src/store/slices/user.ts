import { User } from "@_types/auth";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "@store/queries/user";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error?: string;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: undefined,
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
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.isAuthenticated.matchFulfilled,
                (state, actions) => {
                    const data = actions.payload;
                    state.isAuthenticated = !!data.accessToken;
                    state.user = data.user;
                }
            )
            .addMatcher(
                userApi.endpoints.signIn.matchFulfilled,
                (state, actions) => {
                    state.user = actions.payload.user;
                    state.isAuthenticated = !!actions.payload.accessToken;
                }
            )
            .addMatcher(userApi.endpoints.signOut.matchFulfilled, (state) => {
                (state.isAuthenticated = false), (state.user = null);
            });
    },
});

export const { isAuthenticatedAction, userAction } = userSlice.actions;

export default userSlice.reducer;

export const useUser = () => useAppSelector((state) => state.userReducer);
