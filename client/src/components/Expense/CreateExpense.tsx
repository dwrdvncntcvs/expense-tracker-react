import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useCreateExpenseMutation } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC } from "react";
import { HiPlus } from "react-icons/hi2";
import ExpenseForm from "./ExpenseForm";

const CreateExpense: FC = () => {
    const dispatch = useAppDispatch();

    const [createExpenseRequest, { isLoading }] = useCreateExpenseMutation();

    return (
        <>
            <button
                onClick={() => dispatch(show("add-expense"))}
                id="create-expense  "
                className="fixed bottom-10 right-10 text-white bg-primary p-4 rounded-full hover:bg-primary/80 transition-all"
            >
                <HiPlus size={40} />
            </button>
            <Modal title="Add Expense" name="add-expense">
                <ExpenseForm
                    isLoading={isLoading}
                    onSubmit={async (val, resetForm) => {
                        const month = new Date(val.purchaseDate);

                        val["month"] = month.getMonth() + 1;

                        await createExpenseRequest(val);

                        resetForm();
                        dispatch(
                            success({ message: "Expense successfully added" })
                        );
                        dispatch(hide());
                    }}
                />
            </Modal>
        </>
    );
};

export default CreateExpense;
