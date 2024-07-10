import { Response } from "@_types/api";
import {
    ICategory,
    ICreateCategoryWithoutUser,
} from "@_types/Settings/category";
import { categories } from "@api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoryRequest = createAsyncThunk<
    Response<ICategory[]>,
    void,
    { rejectValue: { data: { message: string } } }
>("categories/all", async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
        const response = await categories.getCategories();
        return fulfillWithValue(response);
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.message);
    }
});

export const createCategoryRequest = createAsyncThunk<
    Response<ICategory>,
    ICreateCategoryWithoutUser,
    { rejectValue: { data: { message: string } } }
>(
    "categories/create",
    async (category, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await categories.createCategories(category);

            return fulfillWithValue(response);
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteCategoryRequest = createAsyncThunk<
    Response<void>,
    string,
    { rejectValue: { data: { message: string } } }
>(
    "categories/delete",
    async (categoryId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await categories.deleteCategory(categoryId);

            return fulfillWithValue(response);
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);
