import { axiosBaseQuery } from "@api/index";
import { createApi } from "@reduxjs/toolkit/query/react";

const api = createApi({
    baseQuery: axiosBaseQuery(),
    tagTypes: ["auth", "settings", "categories"],
    endpoints: () => ({}),
});

export default api;