import { IExpense } from "@_types/expense";
import { capitalize, formatCurrency, formatDate } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { Tag } from "@components/common";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import {
    useDeleteExpenseMutation,
    useUpdateExpenseMutation,
} from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
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
    const params = useParams();

    const [deleteExpenseRequest] = useDeleteExpenseMutation();

    const [updateExpenseRequest, { isLoading: isUpdateLoading }] =
        useUpdateExpenseMutation();

    const date = new Date(expense.purchaseDate);

    type CardActionButton = {
        id: string;
        Icon: IconType;
        onClick: () => void;
        className?: string;
    }


    const actionButtonCommonClassName = "expense-item-action-btn w-8 h-8 rounded-full p-2 py-3 text-white flex items-center justify-center"
    const actionButtons = (_expense: IExpense): CardActionButton[] => [
        {
            id: "view-expense",
            Icon: HiOutlineEye,
            onClick: () => dispatch(show(`expense-${_expense.id}`)),
            className: `${actionButtonCommonClassName} bg-secondary hover:bg-secondary/80`,
        },

        {
            id: "update-expense",
            Icon: HiOutlinePencil,
            onClick: () => dispatch(show(`update-expense-${_expense.id}`)),
            className: `${actionButtonCommonClassName} bg-warning hover:bg-warning/80`,
        },
        {
            id: "delete-expense",
            Icon: HiOutlineTrash,
            onClick: () => dispatch(show(`delete-expense-${_expense.id}`)),
            className: `${actionButtonCommonClassName} bg-failure hover:bg-failure/80`,
        },
    ];


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
                        <div className="absolute top-0 right-0 flex gap-2 p-2">
                            {actionButtons(expense).map(item => <button id={item.id} className={item.className} onClick={item.onClick}>
                                <item.Icon size={20} />
                            </button>)}
                        </div>
                    )}
                    <div className="p-4 flex flex-col gap-3">
                        <h3 className="text-2xl font-semibold text-primary text-start truncate">
                            {expense.label}
                        </h3>
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
            <Modal name={`expense-${expense.id}`} title={expense.label}>
                <div className="flex flex-col gap-2">
                    {!!expense.description && <p className="text-xs">{expense.description}</p>}
                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-primary font-semibold">Details</p>
                        <div className="flex flex-wrap">
                            <div className="flex flex-col w-1/2 p-1 text-quaternary">
                                <div className="flex flex-col w-full p-2 rounded-md bg-primary">
                                    <p className="text-sm font-semibold">Purchased date</p>
                                    <p className="text-sm text-right">{formatDate(date)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 p-1 text-quaternary">
                                <div className="flex flex-col w-full p-2 rounded-md bg-primary">
                                    <p className="text-sm font-semibold">Category</p>
                                    <p className="text-sm text-right">{expense.category.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 p-1 text-quaternary">
                                <div className="flex flex-col w-full p-2 rounded-md bg-primary">
                                    <p className="text-sm font-semibold">Amount</p>
                                    <p className="text-sm text-right">{formatCurrency(expense.amount.toString(), "PHP")}</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 p-1 text-quaternary">
                                <div className="flex flex-col w-full p-2 rounded-md bg-primary">
                                    <p className="text-sm font-semibold">Month</p>
                                    <p className="text-sm text-right">{capitalize(params.month as string)}</p>
                                </div>
                            </div>
                        </div>
                        {expense.tags && !!expense.tags.length && <div className="flex flex-col gap-2">
                            <p className='text-lg text-primary font-semibold'>Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {expense.tagList?.map(tag => <Tag key={tag.id} id={tag.id}>{tag.name}</Tag>)}
                            </div>
                        </div>}
                        {expense.imageUrl && <div className="flex w-full items-center justify-center rounded-md overflow-hidden">
                            <img src={expense.imageUrl} alt={expense.label} className="object-contain" />
                        </div>}
                    </div>
                </div>
            </Modal>
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
                        await updateExpenseRequest({ ...expense, ...val });
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
                        type: expense.type
                    }}
                    isLoading={isUpdateLoading}
                    imageUrl={expense.imageUrl}
                />
            </Modal>
        </>
    );
};

export default MonthlyExpenseItem;
