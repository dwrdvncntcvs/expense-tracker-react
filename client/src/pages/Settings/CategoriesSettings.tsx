import { FC } from "react";
import { HiListBullet, HiTag } from "react-icons/hi2";
import { Field, Form } from "../../components/Form";
import { SettingsContentLayout } from "../../layouts";

const CategoriesSettings: FC = () => {
    return (
        <SettingsContentLayout title="Category">
            <Form
                initialValues={{ name: "" }}
                onSubmit={(val) => {
                    console.log("Val: ", val);
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
            <div>
                <div className="flex gap-2 items-center font-semibold text-black/80">
                    <HiListBullet size={20} />
                    <h2 className="text-lg">Category List</h2>
                </div>
            </div>
        </SettingsContentLayout>
    );
};

export default CategoriesSettings;
