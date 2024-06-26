export interface JwtDefaultData {
    iat: number;
    exp: number;
}

export interface JwtUser extends JwtDefaultData {
    id: string;
    email: string;
}
