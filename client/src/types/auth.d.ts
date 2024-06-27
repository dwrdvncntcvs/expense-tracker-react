export interface SignInData {
    username: string;
    password: string;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export type SignUpData = Omit<User, "id">;
