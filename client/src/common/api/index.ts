import { BaseQueryFn } from "@reduxjs/toolkit/query";
import _axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "../constants";

const axios = _axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axios({
                url: API_URL + url,
                method,
                data,
                params,
                headers,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export default axios;

export { default as categories } from "@requests/categories";
export { default as expense } from "@requests/expense";
export { default as user } from "@requests/user";
