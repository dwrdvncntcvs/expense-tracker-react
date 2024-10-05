import mongoose from "mongoose";
import Expense from "../Expense/model";
import Category from "../Settings/Category/model";
import { CreateExpense } from "../types/Expense/model";
import {
    CreateCategory,
    Category as ICategory,
} from "../types/Settings/Category/category";
import { CreateUser } from "../types/User/model";
import User from "../User/model";

const userData: CreateUser = {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@sample.com",
    username: "john_doe",
    password: "sample1",
};

const categoriesData = (userId: string): CreateCategory[] => [
    {
        name: "Hobby",
        userId: userId,
    },
    {
        name: "Investment",
        userId: userId,
    },
    {
        name: "Needs",
        userId: userId,
    },
];

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateExpenses = (
    categories: ICategory[],
    year: number,
    userId: string
): CreateExpense[] => {
    let expenses: CreateExpense[] = [];

    for (let i = 0; i < 12; i++) {
        categories.forEach((category, j) => {
            expenses.push({
                amount: getRandomNumber(10000, 50000),
                categoryId: category.id,
                description: "",
                label: `Expense-${i + 1}-${j}`,
                month: i + 1,
                purchaseDate: new Date(year, i, getRandomNumber(1, 28)),
                userId,
                tags: [],
            });
        });
    }

    return expenses;
};

interface Options {
    hasCategories: boolean;
    hasExpenses: boolean;
}

async function accountSeeder(
    user: CreateUser,
    options: Options = { hasCategories: true, hasExpenses: true }
) {
    const createdUser = await User.create(user);

    console.log("User added...");

    let categories: ICategory[] = [];
    if (options.hasCategories) {
        categories = await Category.insertMany(categoriesData(createdUser.id));

        console.log("Categories added... ");
    }

    if (options.hasExpenses && categories.length > 0) {
        const expense2023 = generateExpenses(categories, 2023, createdUser.id);
        const expense2024 = generateExpenses(categories, 2024, createdUser.id);

        await Expense.insertMany([...expense2023, ...expense2024]);

        console.log("Expenses added...");
    }

    console.log("Account Seed Completed...");
    console.log("");
}

const seed = async () => {
    mongoose
        .connect(process.env.MONGO_URL || "")
        .then((val) => {
            console.log("Connected\n");
        })
        .catch((err) => console.log("Error: ", err));

    await mongoose.connection.dropDatabase();

    await accountSeeder(userData);
    await accountSeeder(
        {
            email: "janedoe@sample.com",
            first_name: "Jane",
            last_name: "Doe",
            password: "sample1",
            username: "jane_doe",
        },
        {
            hasCategories: false,
            hasExpenses: false,
        }
    );
    await accountSeeder(
        {
            email: "johnnybravo@sample.com",
            first_name: "Johnny",
            last_name: "Bravo",
            password: "sample1",
            username: "johnny_bravo",
        },
        {
            hasCategories: true,
            hasExpenses: false,
        }
    );

    mongoose?.disconnect();
    console.log("Disconnected");
};

seed();
