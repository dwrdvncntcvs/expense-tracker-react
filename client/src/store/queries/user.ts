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
            invalidatesTags: [
                "auth",
                "categories",
                "expense-month-analytics",
                "expense-months",
                "expense-months-details",
                "expense-year-analytics",
                "expense-year-analytics-cat",
                "settings",
            ],
            query: (user) => ({
                url: "/users/sign-in",
                method: "post",
                data: user,
            }),
        }),
        signUp: build.mutation<any, SignUpData>({
            query: (user) => ({
                url: "/users/sign-up",
                method: "post",
                data: user,
            }),
        }),
        signOut: build.mutation<any, void>({
            query: () => ({ url: "/users/sign-out", method: "get" }),
            invalidatesTags: [
                "auth",
                "categories",
                "expense-month-analytics",
                "expense-months",
                "expense-months-details",
                "expense-year-analytics",
                "expense-year-analytics-cat",
                "settings",
            ],
        }),
        updateUser: build.mutation<any, { id: string; user: UpdateUserData }>({
            query: ({ id, user }) => ({
                url: `/users/${id}`,
                method: "put",
                data: user,
            }),
            invalidatesTags: ["auth"],
        }),
        updatePassword: build.mutation<
            any,
            { password: string; newPassword: string }
        >({
            query: (val) => ({
                url: "/users/change/pass",
                method: "put",
                data: val,
            }),
            invalidatesTags: ["auth"],
        }),
        uploadProfileImage: build.mutation<any, { imageData: File }>({
            query: (val) => {
                const formData = new FormData();
                formData.append("user-image", val.imageData);

                return {
                    url: "/users/add-profile-image",
                    data: formData,
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };
            },
            invalidatesTags: ["auth"],
        }),
        deleteUser: build.mutation<any, void>({
            query: () => ({ url: "/users/delete-user", method: "delete" }),
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
    useUpdatePasswordMutation,
    useUploadProfileImageMutation,
    useDeleteUserMutation,
} = userApi;
