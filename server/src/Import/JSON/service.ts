import ExpenseService from "../../Expense/service";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import UserService from "../../User/service";
import { v4 } from "uuid";

export default class ExportService {
    constructor(
        private user: UserService,
        private expense: ExpenseService,
        private category: CategoryService,
        private tag: TagService
    ) {}
}
