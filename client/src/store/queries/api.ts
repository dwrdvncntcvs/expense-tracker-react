import { ExportMethod } from "@_types/export";
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
        downloadData: build.mutation<any, { method_type: ExportMethod }>({
            query: ({ method_type }) => ({
                url: `/export/json/${method_type}`,
                method: "post",
            }),
            transformResponse: (val) => {
                console.log(val);
                return val;
            },
        }),
    }),
});

export const { useDownloadDataMutation } = api;

export default api;
