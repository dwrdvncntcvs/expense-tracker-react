import axios from "..";
import { ICreateExpense } from "@_types/expense";

const createExpense = async (expense: ICreateExpense) => {
    const response = await axios.post("/expenses", JSON.stringify(expense));

    const data = JSON.parse(response.data);

    return {
        data,
        status: response.status,
    };
};

export default {
    createExpense,
};
