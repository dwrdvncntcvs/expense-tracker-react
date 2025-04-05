import { ICategory } from "@_types/Settings/category";
import { Field, Form } from "@components/Form";
import { DeleteCategoryModal } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import { SettingsContentLayout } from "@layouts";
import {
    useCreateCategoryMutation
} from "@store/queries/categories";
import { show } from "@store/slices/modal";
import { useSettings } from "@store/slices/settings";
import { success } from "@store/slices/toast";
import { categoriesSchema } from "@validation/settings";
import { FC, useState } from "react";
import {
    HiListBullet,
    HiOutlineTrash,
    HiSquare3Stack3D,
    HiTag,
} from "react-icons/hi2";

const CategoriesSettings: FC = () => {
    const dispatch = useAppDispatch();
    const { categories } = useSettings();

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const [createCategoryRequest] = useCreateCategoryMutation();

    const openModalDeleteModal = (category: ICategory) => () => {
        setSelectedCategory(category);
        dispatch(show("delete-category"));
    }

    return (
        <SettingsContentLayout icon={HiSquare3Stack3D} title="Category">
            <Form
                initialValues={{ name: "" }}
                validationSchema={categoriesSchema}
                onSubmit={async (val, resetForm) => {
                    await createCategoryRequest(val);

                    dispatch(
                        success({ message: `${val.name} successfully created` })
                    );

                    resetForm();
                }}
                className="flex gap-4"
            >
                <Field
                    placeholder="Enter category here..."
                    icon={{ position: "end", val: HiTag }}
                    name="name"
                />
                <button className="flex gap-2 text-sm items-center bg-primary h-10 text-white px-4 rounded-xl hover:bg-primary/80">
                    Add
                </button>
            </Form>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center font-semibold text-black/80">
                    <HiListBullet size={20} />
                    <h2 className="text-lg">Category List</h2>
                </div>
                <ul className="space-y-2">
                    {(categories as ICategory[]).map((category) => (
                        <li
                            key={category.id}
                            className="py-2 flex justify-between items-center"
                        >
                            <p>{category.name}</p>
                            <button
                                data-testid={`delete-${category.name}`}
                                className="hover:bg-failure text-failure p-2 rounded-full hover:text-white transition-all duration-75"
                                onClick={openModalDeleteModal(category)}
                            >
                                <HiOutlineTrash />
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
            {selectedCategory && (
                <DeleteCategoryModal
                    categoryId={selectedCategory.id}
                    categoryName={selectedCategory.name}
                />
            )}
        </SettingsContentLayout>
    );
};

export default CategoriesSettings;
