interface ICategory {
    id: string;
    name: string;
    userId: string;
}

type ICreateCategory = Omit<ICategory, "id">;

type ICreateCategoryWithoutUser = Omit<ICreateCategory, "userId">;

type IExpenseCategory = Omit<ICategory, "userId">;

export {
    ICategory,
    ICreateCategory,
    ICreateCategoryWithoutUser,
    IExpenseCategory,
};
