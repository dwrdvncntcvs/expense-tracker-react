export type ThemeType = "default" | "retro" | "ultra-violet" | "forest";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    refreshToken?: string | null;
    createdAt: string;
    updatedAt: string;
    themeType: ThemeType;
}

export type UserOmittedValues = "id" | "createdAt" | "updatedAt" | "themeType";

export type CreateUser = Omit<User, UserOmittedValues>;

export type UpdateUser = Omit<
    User,
    "id" | "password" | "refreshToken" | "createdAt" | "updatedAt" | "themeType"
>;
