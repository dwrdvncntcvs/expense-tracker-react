import dotenv from "dotenv";
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

dotenv.config({ path: "../.env.test" });

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
            });
        });
    }

    return expenses;
};

async function accountSeeder() {
    mongoose
        .connect("mongodb://localhost:27017/expense-tracker-test")
        .then((val) => {
            console.log("Connected");
        })
        .catch((err) => console.log("Error: ", err));

    await mongoose.connection.dropDatabase();

    const createdUser = await User.create(userData);

    console.log("User added...");

    let categories: ICategory[] = await Category.insertMany(
        categoriesData(createdUser.id)
    );

    console.log("Categories added... ");

    const expense2023 = generateExpenses(categories, 2023, createdUser.id);
    const expense2024 = generateExpenses(categories, 2024, createdUser.id);

    await Expense.insertMany([...expense2023, ...expense2024]);

    console.log("Expenses added...");

    mongoose?.disconnect();
}

accountSeeder();
