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

    exportAll = async (userId: string) => {
        const [user, expenses, categories, tags] = await Promise.all([
            this._user(userId),
            this._expenses(userId),
            this._categories(userId),
            this._tags(userId),
        ]);

        return JSON.stringify(
            this.includeMetaFromData({
                ...user,
                ...expenses,
                ...categories,
                ...tags,
            }),
            null,
            4
        );
    };

    exportExpenses = async (userId: string, year?: number, month?: number) => {
        const [expenses, categories, tags] = await Promise.all([
            this._expenses(userId, { year, month }),
            this._categories(userId),
            this._tags(userId),
        ]);

        return JSON.stringify(
            this.includeMetaFromData({
                ...expenses,
                ...categories,
                ...tags,
            }),
            null,
            4
        );
    };

    exportCategories = async (userId: string) => {
        const data = await this._categories(userId);

        return JSON.stringify(this.includeMetaFromData({ ...data }), null, 4);
    };

    exportTags = async (userId: string) => {
        const data = await this._tags(userId);

        return JSON.stringify(this.includeMetaFromData({ ...data }), null, 4);
    };

    private includeMetaFromData = (data: object) => ({
        export_id: v4(),
        date_exported: new Date(),
        ...data,
    });

    private _user = async (userId: string) => {
        try {
            const data = await this.user.findById(userId);
            return { user: data };
        } catch (e) {
            return { user: null };
        }
    };

    private _expenses = async (
        userId: string,
        filters?: { year?: number; month?: number }
    ) => {
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
