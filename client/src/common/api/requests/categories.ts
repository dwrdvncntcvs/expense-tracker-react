import axios from "..";
import { ICategory, ICreateCategory } from "../../../types/Settings/category";

const getCategories = async () => {
    const response = await axios.get("/categories");

    const data = JSON.parse(response.data).data as ICategory[];

    return {
        data,
        status: response.status,
    };
};

const createCategories = async (category: ICreateCategory) => {
    const response = await axios.post("/categories", JSON.stringify(category));

    const data = JSON.parse(response.data).data as ICategory;

    return {
        data,
        status: response.status,
    };
};

const deleteCategory = async (id: string) => {
    const response = await axios.delete(`/categories/${id}`);

    const data = JSON.parse(response.data).data;

    return {
        data,
        status: response.status,
    };
};

export default {
    getCategories,
    createCategories,
    deleteCategory,
};
