import ExpenseService from "../../Expense/service";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import { CreateExpense } from "../../types/Expense/model";
import { CreateCategory } from "../../types/Settings/Category/category";
import { ICreateTag } from "../../types/Settings/Category/tag";
import { CreateUser } from "../../types/User/model";
import UserService from "../../User/service";

interface ImportData {
    user?: CreateUser;
    expenses?: CreateExpense[];
    categories?: CreateCategory[];
    tags?: ICreateTag[];
}

export default class ImportService {
    constructor(
        private user: UserService,
        private expense: ExpenseService,
        private category: CategoryService,
        private tag: TagService
    ) {}

    async importData(data: ImportData) {
        const messages: string[] = [];

        if ("user" in data && data?.user) {
            await this.user.createUser(data.user);
            messages.push("User imported");
        }

        if ("expenses" in data && data?.expenses) {
            await this.expense.createExpensesBulk(data?.expenses);
            messages.push("Expenses imported");
        }

        if ("categories" in data && data?.categories) {
            await this.category.createBulk(data.categories);
            messages.push("Categories imported");
        }

        if ("tags" in data && data?.tags) {
            await this.tag.addBulk(data.tags);
            messages.push("Tags imported");
        }

        return messages;
    }
}
