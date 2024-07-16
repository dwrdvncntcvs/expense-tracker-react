import { axiosBaseQuery } from "@api/index";
import { createApi } from "@reduxjs/toolkit/query/react";

const api = createApi({
    baseQuery: axiosBaseQuery(),
    tagTypes: [
        "auth",
        "settings",
        "categories",
        "expense-months",
        "expense-months-details",
        "expense-month-analytics",
        "expense-year-analytics",
        "expense-year-analytics-cat"
    ],
    endpoints: () => ({}),
});

export default api;
