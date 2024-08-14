export interface ITag {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ICreateTag = Omit<ITag, "id" | "createdAt" | "updatedAt">;

export type IUpdateTag = Omit<
    ITag,
    "id" | "userId" | "createdAt" | "updatedAt"
>;
