import { SignInData, SignUpData } from "@_types/auth";
import { isAuthenticatedAction, userAction } from "@store/slices/user";
import api from "./api";

export const userApi = api.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        isAuthenticated: build.query({
            query: () => ({ url: "/users/is-authenticated", method: "get" }),
            providesTags: ["auth"],
        }),
        signIn: build.mutation({
            invalidatesTags: ["auth", "categories"],
            query: (user: SignInData) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
        }),
        signUp: build.mutation({
            query: (user: SignUpData) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
        }),
        signOut: build.mutation({
            query: (_arg: void) => ({ url: "/users/sign-out", method: "get" }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
} = userApi;
