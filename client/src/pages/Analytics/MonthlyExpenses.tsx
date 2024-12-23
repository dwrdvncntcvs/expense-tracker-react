import { MonthlyExpenseCard } from "@components/Expense/Analytics";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const MonthlyExpenses: FC = () => {
    const [month, setMonth] = useState<string>("");

    const params = useParams();

    const {
        data: monthlyExpenseData,
        isLoading: isMonthlyExpenseLoading,
        isFetching: isMonthlyExpenseFetching,
    } = useGetExpensesByMonthAnalyticsQuery(
        {
            month: month,
            year: params.year || "",
        },
        { skip: !month || !params.year }
    );

    const monthlyExpenseDataDetails = monthlyExpenseData?.data?.data

    if (isMonthlyExpenseFetching || isMonthlyExpenseLoading)
        return <div className=" p-2 px-4 rounded-lg">
            <AnalyticsLoading />
        </div>

    return <MonthlyExpenseCard month={month} setMonth={setMonth} data={monthlyExpenseDataDetails || []} />


}

export default MonthlyExpenses