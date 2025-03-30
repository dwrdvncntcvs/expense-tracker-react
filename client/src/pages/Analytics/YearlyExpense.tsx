import { ExpenseType } from "@_types/expense";
import { YearlyExpenseCard } from "@components/Expense/Analytics";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { useGetExpensesYearlyAnalyticsQuery } from "@store/queries/expense";
import { FC } from "react";
import { useParams } from "react-router-dom";

type YearlyExpensesProps = {
    expenseType: ExpenseType
}

const YearlyExpenses: FC<YearlyExpensesProps> = ({ expenseType }) => {
    const params = useParams();


    const {
        data: yearlyExpenseData,
        isLoading: isYearlyExpenseLoading,
        isFetching: isYearlyExpenseFetching,
    } = useGetExpensesYearlyAnalyticsQuery(
        {
            year: params.year ? +params.year : 0,
            expenseType
        },
        {
            skip: !params.year,
        }
    );


    const yearlyExpensesDataDetails = yearlyExpenseData?.data?.data;

    if (isYearlyExpenseLoading || isYearlyExpenseFetching) return <div className="w-full p-2 px-4 rounded-lg">
        <AnalyticsLoading />
    </div>

    return <YearlyExpenseCard data={yearlyExpensesDataDetails} />
}

export default YearlyExpenses