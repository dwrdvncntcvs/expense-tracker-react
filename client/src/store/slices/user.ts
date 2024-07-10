import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "@_types/auth";
import { useAppSelector } from "@hooks/storeHooks";
import {
    isAuthenticatedRequest,
    signInRequest,
    signOutRequest,
    signUpRequest,
} from "@store/thunk/user";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error?: string;
    accessToken?: string;
    refreshToken?: string;
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
    extraReducers(builder) {
        builder
            .addCase(isAuthenticatedRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(isAuthenticatedRequest.fulfilled, (state, actions) => {
                const { accessToken, refreshToken, user } =
                    actions.payload.data;

                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.user = user;
                state.isAuthenticated = !!accessToken;
                state.loading = false;
            })
            .addCase(isAuthenticatedRequest.rejected, (state, actions) => {
                console.log(actions.payload);
                state.error = "Error";
                state.loading = false;
            });
        builder
            .addCase(signInRequest.pending, () => {})
            .addCase(signInRequest.fulfilled, () => {})
            .addCase(signInRequest.rejected, () => {});

        builder
            .addCase(signUpRequest.pending, () => {})
            .addCase(signUpRequest.fulfilled, () => {})
            .addCase(signUpRequest.rejected, () => {});

        builder
            .addCase(signOutRequest.pending, () => {})
            .addCase(signOutRequest.fulfilled, (state) => {
                state.accessToken = undefined;
                state.refreshToken = undefined;
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(signOutRequest.rejected, () => {});
    },
});

export const { isAuthenticatedAction, userAction } = userSlice.actions;

export default userSlice.reducer;

export const useUser = () => useAppSelector((state) => state.userReducer);
