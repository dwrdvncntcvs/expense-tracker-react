import { IExpense } from "@_types/expense";
import { MONTHS } from "@common/constants";
import { capitalize, formatCurrency } from "@common/utils/str";
import { useGetExpensesByMonthQuery } from "@store/queries/expense";
import { FC } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseMonth: FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useGetExpensesByMonthQuery({
        month: params?.month
            ? MONTHS[params?.month.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params?.year || "",
    });

    if (isLoading) return <div>Loading ...</div>;

    // const metaData = data.data.expenses.metadata;
    const totalAmount = data.data.expenses.totalAmount;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between h-10">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-primary rounded-full h-10 w-10 flex justify-center items-center hover:border-2 hover:border-primary"
                    >
                        <HiArrowLeft size={20} />
                    </button>
                    {params?.month && (
                        <h2 className="font-bold text-3xl text-primary">
                            {capitalize(params?.month)}{" "}
                            <span className="text-sm ml-2 text-gray-600 font-normal">
                                {formatCurrency(totalAmount, "PHP")} (Total
                                Expenses)
                            </span>
                        </h2>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap ">
                {expenses.map((expense) => {
                    const date = new Date(expense.purchaseDate);
                    return (
                        <div
                            className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 p-2"
                            key={expense.id}
                        >
                            <div className="h-full shadow-md rounded-lg border flex flex-col justify-between border-primary">
                                <div className="p-4 flex flex-col gap-3">
                                    <h3 className="text-2xl font-semibold text-primary">
                                        {expense.label}
                                    </h3>
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
                    );
                })}
            </div>
        </div>
    );
};

export default ExpenseMonth;
