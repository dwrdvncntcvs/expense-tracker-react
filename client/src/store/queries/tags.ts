import { ICreateTag } from "@_types/Settings/tag";
import api from "./api";

type GetTagsParams = { search: string };

const tagsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTags: build.query<any, GetTagsParams>({
            query: (val) => {
                const urlParams = new URLSearchParams();
                urlParams.set("search", val.search);

                return {
                    url: `/tags?${urlParams.toString()}`,
                    method: "get",
                };
            },
            providesTags: ["expense-tags"],
        }),
        createTag: build.mutation<any, ICreateTag>({
            query: (val) => ({ url: "/tags", data: val, method: "post" }),
            invalidatesTags: ["expense-tags"],
        }),
        removeTag: build.mutation<any, string>({
            query: (val) => ({ url: `/tags/${val}`, method: "delete" }),
            invalidatesTags: ["expense-tags"],
        }),
    }),
});

export const { useGetTagsQuery, useCreateTagMutation, useRemoveTagMutation } =
    tagsApi;

export default tagsApi;
