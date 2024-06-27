import { Axios } from "axios";
import { API_URL } from "../constants";

const axios = new Axios({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axios;
