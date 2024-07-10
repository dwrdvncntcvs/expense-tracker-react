import { axiosBaseQuery } from "@api/index";
import { createApi } from "@reduxjs/toolkit/query/react";

const api = createApi({
    baseQuery: axiosBaseQuery(),
    tagTypes: ["auth", "settings", "categories", "expense-months"],
    endpoints: () => ({}),
});

export default api;
