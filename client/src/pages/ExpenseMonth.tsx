import { IExpense } from "@_types/expense";
import { MONTHS } from "@common/constants";
import { capitalize, formatCurrency, formatDate } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { ExpenseForm } from "@components/Expense";
import { ExpenseFilterModal } from "@components/Modal";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import {
    useGetExpensesByMonthQuery,
    useUpdateExpenseMutation,
} from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC, Fragment } from "react";
import { HiArrowLeft, HiFunnel } from "react-icons/hi2";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ExpenseMonth: FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { data, isLoading } = useGetExpensesByMonthQuery({
        month: params?.month
            ? MONTHS[params?.month.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params?.year || "",
        query: searchParams.toString(),
    });

    const [updateExpenseRequest, { isLoading: isUpdateLoading }] =
        useUpdateExpenseMutation();

    if (isLoading) return <div>Loading ...</div>;

    // const metaData = data.data.expenses.metadata;
    const totalAmount = data.data.expenses.totalAmount;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between h-10">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate("/", { replace: true })}
                        className="text-primary rounded-full h-10 w-10 flex justify-center items-center hover:border-2 hover:border-primary"
                    >
                        <HiArrowLeft size={20} />
                    </button>
                    {params?.month && (
                        <h2 className="font-bold text-3xl text-primary">
                            {capitalize(params?.month)}{" "}
                        </h2>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    <span className="text-sm ml-2 text-gray-600 font-normal">
                        Total: {formatCurrency(totalAmount, "PHP")}
                    </span>
                    <ActionButtons
                        rounded="full"
                        className="h-10 w-10 flex justify-center items-center"
                        options={[
                            {
                                type: "button",
                                bgColor: "secondary",
                                color: "plain",
                                icon: HiFunnel,
                                onClick: () => {
                                    dispatch(show("expense-filter"));
                                },
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-wrap ">
                {expenses.map((expense) => {
                    const date = new Date(expense.purchaseDate);
                    return (
                        <Fragment key={expense.id}>
                            <div className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 p-2">
                                <div className="h-full shadow-md rounded-lg border flex flex-col justify-between border-primary">
                                    <div className="p-4 flex flex-col gap-3">
                                        <div>
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        show(
                                                            `expense-${expense.id}`
                                                        )
                                                    );
                                                }}
                                                className="text-2xl font-semibold text-primary text-start hover:underline"
                                            >
                                                {expense.label}
                                            </button>
                                        </div>
                                        <p className="line-clamp-4 text-xs">
                                            {expense.description}
                                        </p>
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
                                name={`expense-${expense.id}`}
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
                                        purchaseDate: formatDate(
                                            new Date(expense.purchaseDate)
                                        )
                                            .split("/")
                                            .join("-"),
                                    }}
                                    isLoading={isUpdateLoading}
                                />
                            </Modal>
                        </Fragment>
                    );
                })}
            </div>
            <ExpenseFilterModal />
        </div>
    );
};

export default ExpenseMonth;
