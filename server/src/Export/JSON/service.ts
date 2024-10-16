import { formatData } from "../../database/mongoDb";
import ExpenseService from "../../Expense/service";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import UserService from "../../User/service";

export default class ExportService {
    constructor(
        private user: UserService,
        private expense: ExpenseService,
        private category: CategoryService,
        private tag: TagService
    ) {}

    exportAll = async (userId: string) => {
        const [user, expenses, categories, tags] = await Promise.all([
            this._user(userId),
            this._expenses(userId),
            this._categories(userId),
            this._tags(userId),
        ]);

        console.log(
            JSON.stringify(
                { ...user, ...expenses, ...categories, ...tags },
                null,
                4
            )
        );

        return JSON.stringify(
            { ...user, ...expenses, ...categories, ...tags },
            null,
            4
        );
    };

    private _user = async (userId: string) => {
        try {
            const data = await this.user.findById(userId);
            return { user: data };
        } catch (e) {
            return { user: null };
        }
    };

    private _expenses = async (userId: string, filters?: { year?: number }) => {
        try {
            const data = await this.expense.getRawExpenses(userId, filters);
            return { expenses: data };
        } catch (e) {
            return { expenses: [] };
        }
    };

    private _categories = async (userId: string) => {
        try {
            const data = await this.category.all(userId);
            return { categories: data };
        } catch (e) {
            return { categories: [] };
        }
    };

    private _tags = async (userId: string) => {
        try {
            const data = await this.tag.getAll(userId);
            return { tags: data };
        } catch (e) {
            return { categories: [] };
        }
    };
}
