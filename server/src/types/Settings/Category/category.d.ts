interface Category {
    id: string;
    name: string;
    userId: string;
}

type CreateCategory = Omit<Category, "id">;

export { Category, CreateCategory };
