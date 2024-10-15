interface ITag {
    readonly id: string;
    name: string;
    readonly userId: string;
    createdAt: string;
    updatedAt: string;
}

type ICreateTag = { name: string };

export { ICreateTag, ITag };
