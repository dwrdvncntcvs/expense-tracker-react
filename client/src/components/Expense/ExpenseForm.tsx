import { ICreateExpense } from "@_types/expense";
import { Field, Form, ImageField } from "@components/Form";
import Select from "@components/Form/Select";
import Textarea from "@components/Form/Textarea";
import { useSettings } from "@store/slices/settings";
import { FormikState } from "formik";
import { FC } from "react";
import { expenseValidation } from "@validation/expense";

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
    const { categories } = useSettings();

    return (
        <Form
            className="w-full flex flex-wrap gap-2 space-y-2"
            initialValues={
                initialValues || {
                    categoryId: "",
                    label: "",
                    purchaseDate: "",
                    amount: "",
                    description: "",
                }
            }
            validationSchema={expenseValidation}
            onSubmit={onSubmit}
        >
            <ImageField
                name="expense-image"
                imageUrl={imageUrl}
                enableRemoveImage={!editMode}
            />
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="label">Label</label>
                <Field name="label" id="label" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Description</label>
                <Textarea name="description" id="description" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="categoryId">Category</label>
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
                <label htmlFor="purchaseDate">Purchase Date</label>
                <Field
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    disabled={editMode}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="amount">Price</label>
                <Field
                    name="amount"
                    id="amount"
                    icon={{ position: "start", val: "Php" }}
                    disabled={editMode}
                />
            </div>
            <div className="flex w-full items-center justify-end">
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
