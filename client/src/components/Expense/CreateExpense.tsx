import { Field, Form } from "@components/Form";
import Select from "@components/Form/Select";
import Textarea from "@components/Form/Textarea";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { show } from "@store/slices/modal";
import { useSettings } from "@store/slices/settings";
import { FC } from "react";
import { HiPlus } from "react-icons/hi2";

const CreateExpense: FC = () => {
    const dispatch = useAppDispatch();
    const { categories } = useSettings();

    return (
        <>
            <button
                onClick={() => dispatch(show("add-expense"))}
                className="fixed bottom-10 right-10 text-white bg-primary p-4 rounded-full hover:bg-primary/80 transition-all"
            >
                <HiPlus size={40} />
            </button>
            <Modal title="Add Expense" name="add-expense">
                <Form
                    className="w-full flex flex-wrap gap-2 space-y-2"
                    initialValues={{
                        categoryId: "",
                        label: "",
                        purchaseDate: "",
                        amount: "",
                        description: "",
                    }}
                    onSubmit={(val, resetForm) => {
                        console.log("value: ", val);

                        resetForm();
                    }}
                >
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
                            options={categories?.map((val) => {
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
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="amount">Price</label>
                        <Field
                            name="amount"
                            id="amount"
                            icon={{ position: "start", val: "Php" }}
                        />
                    </div>
                    <div className="flex w-full items-center justify-end">
                        <button
                            type="submit"
                            className="bg-secondary text-white px-5 py-2 rounded-xl hover:bg-secondary/80"
                        >
                            Create Expense
                        </button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default CreateExpense;
