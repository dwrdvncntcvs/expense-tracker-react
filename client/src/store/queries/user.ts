import { SignInData, SignUpData } from "@_types/auth";
import { isAuthenticatedAction, userAction } from "@store/slices/user";
import api from "./api";

export const userApi = api.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        isAuthenticated: build.query({
            query: () => ({ url: "/users/is-authenticated", method: "get" }),
            providesTags: ["auth"],
            onCacheEntryAdded: async (
                _args: void,
                { dispatch, cacheDataLoaded }
            ) => {
                const data = await cacheDataLoaded;

                const accessToken = data.data?.accessToken;
                const user = data.data?.user;

                dispatch(isAuthenticatedAction(!!accessToken));
                dispatch(userAction(user));
            },
        }),
        signIn: build.mutation({
            invalidatesTags: ["auth", "categories"],
            query: (user: SignInData) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
            onCacheEntryAdded: async (_arg, { cacheDataLoaded, dispatch }) => {
                const data = await cacheDataLoaded;

                const accessToken = data.data?.accessToken;
                const user = data.data?.user;

                dispatch(isAuthenticatedAction(!!accessToken));
                dispatch(userAction(user));
            },
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
            onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
                await cacheDataLoaded;

                dispatch(isAuthenticatedAction(false));
                dispatch(userAction(null));
            },
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
} = userApi;
