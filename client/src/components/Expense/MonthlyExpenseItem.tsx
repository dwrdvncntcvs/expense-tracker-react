import { IExpense } from "@_types/expense";
import { formatCurrency, formatDate } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import {
    useDeleteExpenseMutation,
    useUpdateExpenseMutation,
} from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlinePhoto, HiOutlineTrash } from "react-icons/hi2";
import ExpenseForm from "./ExpenseForm";
import { Tag } from "@components/common";

interface MonthlyExpenseItemProps {
    expense: IExpense;
    index: number;
}

const MonthlyExpenseItem: FC<MonthlyExpenseItemProps> = ({
    expense,
    index,
}) => {
    const dispatch = useAppDispatch();
    const [hoveredId, setHoveredId] = useState("");

    const [deleteExpenseRequest] = useDeleteExpenseMutation();

    const [updateExpenseRequest, { isLoading: isUpdateLoading }] =
        useUpdateExpenseMutation();

    const date = new Date(expense.purchaseDate);

    return (
        <>
            <div className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 p-2">
                <div
                    data-testid={`expense-${index}`}
                    className="expense-card h-full shadow-md rounded-lg flex flex-col justify-between border-primary border-2 relative overflow-auto"
                    onMouseOver={() => {
                        if (hoveredId !== expense.id) {
                            setHoveredId(expense.id);
                        }
                    }}
                    onMouseLeave={() => {
                        if (hoveredId === expense.id) setHoveredId("");
                    }}
                >
                    {hoveredId === expense.id && (
                        <div className="w-full absolute bottom-0 flex flex-col bg-white">
                            {expense.imageUrl && (
                                <button
                                    id="view-expense-image"
                                    className="expense-item-action-btn bg-secondary w-full p-2 py-3 text-white flex items-center justify-center hover:bg-secondary/80"
                                    onClick={() => {
                                        dispatch(
                                            show(`expense-image-${expense.id}`)
                                        );
                                    }}
                                >
                                    <HiOutlinePhoto size={20} />
                                </button>
                            )}
                            <button
                                id="update-expense"
                                className="expense-item-action-btn bg-warning w-full p-2 py-3 text-white flex items-center justify-center hover:bg-warning/80"
                                onClick={() => {
                                    dispatch(
                                        show(`update-expense-${expense.id}`)
                                    );
                                }}
                            >
                                <HiOutlinePencil size={20} />
                            </button>
                            <button
                                id="delete-expense"
                                className="expense-item-action-btn bg-failure w-full p-2 py-3 text-white flex items-center justify-center hover:bg-failure/80"
                                onClick={() => {
                                    dispatch(
                                        show(`delete-expense-${expense.id}`)
                                    );
                                }}
                            >
                                <HiOutlineTrash size={20} />
                            </button>
                        </div>
                    )}
                    <div className="p-4 flex flex-col gap-3">
                        <h3 className="text-2xl font-semibold text-primary text-start">
                            {expense.label}
                        </h3>
                    </div>
                    <div className="flex gap-1 px-3">
                        {expense.tagList?.map((tag) => (
                            <Tag id={tag.id}>{tag.name}</Tag>
                        ))}
                    </div>
                    <div className="flex gap-4 p-4 justify-between items-end">
                        <p className="italic text-sm text-gray-600">
                            {Intl.DateTimeFormat("en", {
                                dateStyle: "medium",
                            }).format(date)}
                        </p>

                        <div className="flex flex-col items-end">
                            <p className="text-lg text-secondary font-semibold">
                                {formatCurrency(
                                    expense.amount.toString(),
                                    "PHP"
                                )}
                            </p>
                            <p className="italic text-sm text-gray-600">
                                {expense.category.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                name={`delete-expense-${expense.id}`}
                title={`Delete ${expense.label}`}
            >
                <p className="text-sm">
                    Are you sure you want to delete{" "}
                    <span className="text-primary font-bold">
                        {expense.label}
                    </span>
                    ? You won't be able to undo this.
                </p>
                <div className="flex flex-row-reverse">
                    <ActionButtons
                        className="p-2 px-4"
                        options={[
                            {
                                type: "button",
                                bgColor: "primary",
                                color: "plain",
                                label: "Delete",
                                onClick: async () => {
                                    await deleteExpenseRequest(expense.id);

                                    dispatch(
                                        success({
                                            message: `${expense.label} successfully deleted.`,
                                        })
                                    );
                                },
                            },
                        ]}
                    />
                </div>
            </Modal>
            <Modal
                name={`update-expense-${expense.id}`}
                title={`Edit ${expense.label}`}
            >
                <ExpenseForm
                    onSubmit={async (val) => {
                        await updateExpenseRequest(val);
                        dispatch(
                            success({
                                message: `${val.label} successfully updated!`,
                            })
                        );
                        dispatch(hide());
                    }}
                    editMode
                    initialValues={{
                        ...expense,
                        purchaseDate: formatDate(date).split("/").join("-"),
                    }}
                    isLoading={isUpdateLoading}
                    imageUrl={expense.imageUrl}
                />
            </Modal>
            <Modal
                name={`expense-image-${expense.id}`}
                title={`${expense.label} Image`}
            >
                <div className="flex w-full items-center justify-center">
                    <img
                        src={expense.imageUrl}
                        className="object-contain"
                        alt=""
                    />
                </div>
            </Modal>
        </>
    );
};

export default MonthlyExpenseItem;
