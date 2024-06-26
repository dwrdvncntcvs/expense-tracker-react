export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    refreshToken?: string | null
    createdAt: string;
    updatedAt: string;
}

export type UserOmittedValues = "id" | "createdAt" | "updatedAt";

export type CreateUser = Omit<User, UserOmittedValues>;
