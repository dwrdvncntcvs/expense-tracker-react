import { MONTHS } from "@common/constants";
import { Dropdown } from "@components/common";
import { MonthlyExpenseCard } from "@components/Expense/Analytics";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { useExpense } from "@store/slices/expense";
import { capitalize } from "lodash-es";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const MonthlyExpenses: FC = () => {
    const [month, setMonth] = useState<string>("");

    const params = useParams();
    const { expenses } = useExpense();

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


    return <div className=" h-full p-2 px-4 rounded-lg shadow-lg">
        <div className="flex md:flex-row flex-col items-center justify-between">
            <h1 className="text-xl font-bold text-primary py-2">
                Monthly Expenses / Category
            </h1>
            {params?.year && (
                <Dropdown
                    value={month}
                    className="md:w-auto w-full"
                    buttonClassName="md:w-auto w-full"
                    label="Select month"
                    options={expenses[params.year]?.map(
                        (month) => ({
                            label: capitalize(month),
                            value: MONTHS[
                                month.toUpperCase() as keyof typeof MONTHS
                            ],
                        })
                    )}
                    shouldUpdateLabel
                    canClear
                    selectCb={(value) => {
                        setMonth(value);
                    }}
                />
            )}
        </div>
        {isMonthlyExpenseFetching || isMonthlyExpenseLoading ?
            <AnalyticsLoading />
            :
            <MonthlyExpenseCard month={month} data={monthlyExpenseDataDetails || []} />
        }
    </div>


}

export default MonthlyExpenses