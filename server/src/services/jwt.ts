import { sign, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../variables";

class JwtService {
    constructor() {}

    generateToken = (data: any, expiresIn = "7d") => {
        return sign(data, SECRET_KEY, { expiresIn });
    };

    verifyToken = <T>(token: string): Promise<T> => {
        return new Promise((resolve, reject) => {
            verify(token, SECRET_KEY, (err, data) => {
                if (err) reject(err);

                resolve(data as T);
            });
        });
    };
}

export default JwtService;
