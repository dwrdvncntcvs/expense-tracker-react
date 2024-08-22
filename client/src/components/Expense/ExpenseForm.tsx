import { ICreateExpense } from "@_types/expense";
import { ComboBox, Field, Form, ImageField } from "@components/Form";
import Select from "@components/Form/Select";
import Textarea from "@components/Form/Textarea";
import { useSettings } from "@store/slices/settings";
import { FormikState } from "formik";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";
import { expenseValidation } from "@validation/expense";
import { Option } from "@_types/elements";

type OnSubmit = (
    val: any,
    resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void
) => void;

interface ExpenseFormProps {
    onSubmit: OnSubmit;
    initialValues?: ICreateExpense;
    isLoading: boolean;
    editMode?: boolean;
    imageUrl?: string;
}

const ExpenseForm: FC<ExpenseFormProps> = ({
    onSubmit,
    initialValues,
    isLoading,
    editMode = false,
    imageUrl,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<Option[]>([]);

    const [tagText, setTagText] = useState<string>("");

    const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value);
    };

    const handleTagKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission

            if (tagText.trim() !== "") {
                setOptions((prev) => ({ ...prev, tagText }));
                setTagText("");
            }
        }
    };

    const { categories } = useSettings();

    return (
        <Form
            className="w-full grid grid-cols-2 gap-2 space-y-2"
            initialValues={
                initialValues || {
                    categoryId: "",
                    label: "",
                    purchaseDate: "",
                    amount: "",
                    description: "",
                    tags: [],
                }
            }
            validationSchema={expenseValidation}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col col-span-2 gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="label">
                    Label
                </label>
                <Field name="label" id="label" />
            </div>
            <div className="flex flex-col col-span-2 gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="description">
                    Description
                </label>
                <Textarea name="description" id="description" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-tertiary" htmlFor="categoryId">
                    Category
                </label>
                <Select
                    name="categoryId"
                    id="categoryId"
                    options={categories.map((val) => {
                        return {
                            label: val.name,
                            value: val.id,
                        };
                    })}
                />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-tertiary" htmlFor="purchaseDate">
                    Purchase Date
                </label>
                <Field
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    disabled={editMode}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="amount">
                    Price
                </label>
                <Field
                    name="amount"
                    id="amount"
                    icon={{ position: "start", val: "Php" }}
                    disabled={editMode}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="tag">
                    Tag
                </label>
                <ComboBox
                    inputProps={{
                        placeholder: "Enter tag here...",
                        value: tagText,
                        onChange: handleTagChange,
                        onKeyDown: handleTagKeyDown,
                    }}
                    options={options}
                    name="tags"
                    setSelectedValues={setSelectedOptions}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                {JSON.stringify(selectedOptions)}
            </div>
            <div className="col-span-2">
                <ImageField
                    name="expense-image"
                    imageUrl={imageUrl}
                    enableRemoveImage={!editMode}
                />
            </div>
            <div className="flex w-full col-span-2 items-center justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-secondary text-white px-5 py-2 rounded-xl hover:bg-secondary/80 disabled:opacity-0 disabled:cursor-not-allowed"
                >
                    {editMode ? "Save" : "Create Expense"}
                </button>
            </div>
        </Form>
    );
};

export default ExpenseForm;
