import { FC } from "react";
import { HiListBullet, HiTag, HiOutlineTrash } from "react-icons/hi2";
import { Field, Form } from "../../components/Form";
import { SettingsContentLayout } from "../../layouts";
import { useSettings } from "../../contexts/Settings";

const CategoriesSettings: FC = () => {
    const { categories, categoryActions } = useSettings();

    return (
        <SettingsContentLayout title="Category">
            <Form
                initialValues={{ name: "" }}
                onSubmit={async (val, resetForm) => {
                    await categoryActions.createCategory(val);
                    resetForm();
                }}
                className="flex gap-4"
            >
                <Field
                    placeholder="Enter category here..."
                    icon={{ position: "end", val: HiTag }}
                    name="name"
                />
                <button className="flex gap-2 text-sm items-center bg-primary text-white px-4 rounded-xl hover:bg-primary/80">
                    Add
                </button>
            </Form>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center font-semibold text-black/80">
                    <HiListBullet size={20} />
                    <h2 className="text-lg">Category List</h2>
                </div>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li className="py-2 flex justify-between items-center">
                            <p>{category.name}</p>
                            <button
                                className="hover:bg-failure text-failure p-2 rounded-full hover:text-white transition-all duration-75"
                                onClick={async () => {
                                    categoryActions.deleteCategory(category.id);
                                }}
                            >
                                <HiOutlineTrash />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </SettingsContentLayout>
    );
};

export default CategoriesSettings;