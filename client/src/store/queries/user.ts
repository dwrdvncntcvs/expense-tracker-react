import { SignInData, SignUpData, UpdateUserData } from "@_types/auth";
import api from "./api";

export const userApi = api.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        isAuthenticated: build.query<any, void>({
            query: () => ({ url: "/users/is-authenticated", method: "get" }),
            providesTags: ["auth"],
        }),
        signIn: build.mutation<any, SignInData>({
            invalidatesTags: ["auth", "categories"],
            query: (user) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
        }),
        signUp: build.mutation<any, SignUpData>({
            query: (user) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
        }),
        signOut: build.mutation<any, void>({
            query: () => ({ url: "/users/sign-out", method: "get" }),
            invalidatesTags: ["auth"],
        }),
        updateUser: build.mutation<any, { id: string; user: UpdateUserData }>({
            query: ({ id, user }) => ({
                url: `/users/${id}`,
                method: "put",
                data: user,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useUpdateUserMutation,
} = userApi;
