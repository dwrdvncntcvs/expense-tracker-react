import { ThemeType } from "./theme";

export interface SignInData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    themeType: ThemeType
}

export type SignUpData = Omit<User, "id">;

export interface UserResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
export type UpdateUserData = Omit<
    User,
    "id" | "password" | "refreshToken" | "createdAt" | "updatedAt"
>;
