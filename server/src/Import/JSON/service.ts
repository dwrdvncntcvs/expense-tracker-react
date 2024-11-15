import ExpenseService from "../../Expense/service";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import { CreateExpense, Expense } from "../../types/Expense/model";
import {
    Category,
    CreateCategory,
} from "../../types/Settings/Category/category";
import { ICreateTag, ITag } from "../../types/Settings/Category/tag";
import { CreateUser, User } from "../../types/User/model";
import UserService from "../../User/service";

type AddID<T extends any> = Omit<T, "id">;

export interface ImportData {
    user?: CreateUser;
    expenses?: CreateExpense[];
    categories?: CreateCategory[];
    tags?: ICreateTag[];
}

export interface InvalidImportData {
    user?: InvalidProperties;
    expenses?: InvalidProperties;
    categories?: InvalidProperties;
    tags?: InvalidProperties;
}

interface ExportData {
    user?: User;
    expenses?: Expense[];
    categories?: Category[];
    tags?: ITag[];
}

export type InvalidProperties = {
    message: string;
    invalid: true;
};

const VALID_EXPENSE: (keyof Expense)[] = [
    "amount",
    "categoryId",
    "description",
    "imageUrl",
    "label",
    "month",
    "purchaseDate",
    "tags",
];

const VALID_CATEGORY: (keyof Category)[] = ["name"];

const VALID_TAG: (keyof ITag)[] = ["name"];

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

    cleanData(
        data: ExportData,
        userId: string
    ): ImportData | InvalidImportData {
        const importData: ImportData | InvalidImportData = {};

        Object.keys(data).forEach((key) => {
            const _key: keyof ImportData = key as keyof ImportData;

            switch (_key) {
                case "categories": {
                    const value = data[_key];
                    if (value) {
                        const cleanData = this.cleanCategories(value, userId);
                        importData[_key] = cleanData;
                    } else {
                        importData[_key] = undefined;
                    }
                    break;
                }
                case "expenses": {
                    const value = data[_key];
                    if (value) {
                        const cleanData = this.cleanExpenses(value, userId);
                        importData[_key] = cleanData;
                    } else {
                        importData[_key] = undefined;
                    }
                    break;
                }
                case "tags": {
                    const value = data[_key];
                    if (value) {
                        const cleanData = this.cleanTags(value, userId);
                        importData[_key] = cleanData;
                    } else {
                        importData[_key] = undefined;
                    }
                    break;
                }
                default:
                    throw new Error("Invalid key of `${_key}`");
            }
        });

        return importData;
    }

    private isPropertiesValid = <T extends object>(
        array: T[],
        keys: string[]
    ): boolean => {
        let isValid = false;

        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            const valueKeys = Object.keys(value);
            isValid = valueKeys.some((key) => keys.includes(key));
            if (!isValid) break;
        }

        return isValid;
    };

    private cleanTags(
        tags: ITag[],
        userId: string
    ): ICreateTag[] | InvalidProperties {
        const isValid = this.isPropertiesValid<ITag>(tags, VALID_TAG);

        if (!isValid)
            return {
                message: "Some fields are missing from tags",
                invalid: true,
            };

        return tags.map((tag) => ({ name: tag.name, userId: userId }));
    }

    private cleanExpenses(
        expenses: Expense[],
        userId: string
    ): CreateExpense[] | InvalidProperties {
        const isValid = this.isPropertiesValid<Expense>(
            expenses,
            VALID_EXPENSE
        );

        if (!isValid)
            return {
                message: "Some fields are missing from expenses",
                invalid: true,
            };

        return expenses.map((expense) => ({
            amount: expense.amount,
            categoryId: expense.categoryId,
            description: expense.description,
            label: expense.label,
            month: expense.month,
            purchaseDate: expense.purchaseDate,
            tags: expense.tags,
            userId,
            imageUrl: expense.imageUrl,
        }));
    }

    private cleanCategories(
        categories: Category[],
        userId: string
    ): CreateCategory[] | InvalidProperties {
        const isValid = this.isPropertiesValid<Category>(
            categories,
            VALID_CATEGORY
        );

        if (!isValid)
            return {
                message: "Some fields are missing from tags",
                invalid: true,
            };

        return categories.map((category) => ({
            name: category.name,
            userId,
        }));
    }
}
