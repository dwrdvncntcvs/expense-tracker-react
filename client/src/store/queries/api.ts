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
        "expense-year-analytics-cat",
        "expense-tags",
    ],
    endpoints: (build) => ({
        downloadAllData: build.mutation<any, void>({
            query: () => ({ url: "/export/json/all", method: "post" }),
            transformResponse: (val) => {
                console.log(val);
                return val;
            },
        }),
    }),
});

export const { useDownloadAllDataMutation } = api;

export default api;
