import { Pagination } from "./Pagination/pagination";
import { User } from "./User/model";

declare global {
    namespace Express {
        interface Request {
            user: User;
            pagination: Pagination
        }
    }
}
