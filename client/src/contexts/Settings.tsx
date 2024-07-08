import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { categories } from "../common/api";
import {
    ICategory,
    ICreateCategory,
    ICreateCategoryWithoutUser,
} from "../types/Settings/category";
import { useUser } from "./User";

interface CategoryActions {
    createCategory: (category: ICreateCategory) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

interface ISettingsContext {
    categories: ICategory[];
    categoryActions: CategoryActions;
}

const SettingsContext = createContext<ISettingsContext>({
    categories: [],
    categoryActions: {
        createCategory: async () => {},
        deleteCategory: async () => {},
    },
});

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["categories"],
        queryFn: () => {
            return categories.getCategories();
        },
    });

    const { mutateAsync: createCategoryMutate } = useMutation({
        mutationKey: ["add-categories"],
        mutationFn: (category: ICreateCategory) => {
            return categories.createCategories(category);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const { mutateAsync: deleteCategoryMutate } = useMutation({
        mutationKey: ["delete-category"],
        mutationFn: (id: string) => categories.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const createCategory = async (category: ICreateCategoryWithoutUser) => {
        if (user) await createCategoryMutate({ ...category, userId: user?.id });
    };

    const deleteCategory = async (id: string) => {
        await deleteCategoryMutate(id);
    };

    return (
        <SettingsContext.Provider
            value={{
                categories: data?.data || [],
                categoryActions: {
                    createCategory,
                    deleteCategory,
                },
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);

    if (!context)
        throw new Error("Cannot use 'useSettings' outside of SettingsProvider");

    return context;
};

export default SettingsProvider;
