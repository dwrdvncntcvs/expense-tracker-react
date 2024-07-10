import { useGetExpensesByMonthQuery } from "@store/queries/expense";
import { MONTHS } from "@common/constants";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "@common/utils/str";
import { IExpense } from "@_types/expense";

const ExpenseMonth: FC = () => {
    const params = useParams();

    const { data, isLoading } = useGetExpensesByMonthQuery({
        month: params?.month
            ? MONTHS[params?.month.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params?.year || "",
    });

    if (isLoading) return <div>Loading ...</div>;

    const metaData = data.data.expenses.metadata;
    const totalAmount = data.data.expenses.totalAmount;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4">
            <div>
                {params?.month && (
                    <h2>
                        {capitalize(params?.month)}{" "}
                        <span>Total Expenses: {totalAmount}</span>
                    </h2>
                )}
            </div>
            <div className="flex flex-wrap ">
                {expenses.map((expense) => (
                    <div
                        className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4  "
                        key={expense.id}
                    >
                        <div className="m-1 p-4 shadow-md rounded-xl">
                            {expense.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseMonth;
