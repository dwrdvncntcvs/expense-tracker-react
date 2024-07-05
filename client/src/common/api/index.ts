import { Axios } from "axios";
import { API_URL } from "../constants";

const axios = new Axios({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axios;

export { default as user } from "./requests/user";
export { default as expense } from "./requests/expense";
