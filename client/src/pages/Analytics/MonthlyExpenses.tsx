import { ExpenseType } from "@_types/expense";
import { MONTHS } from "@common/constants";
import { AnalyticsCard } from "@components/Analytics";
import { Dropdown } from "@components/common";
import { AnalyticsLoading } from "@components/LoadingScreen";
import ReportLayout from "@layouts/ReportsLayout";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { useExpense } from "@store/slices/expense";
import { capitalize } from "lodash-es";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const MonthlyExpenses: FC = () => {
    const [month, setMonth] = useState<string>("");
    const [selectedType, setSelectedType] = useState<ExpenseType>("incoming");

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

    const monthlyExpenseDataDetails = monthlyExpenseData?.data?.data[selectedType];

    return <div className="p-4 rounded-lg shadow-lg">
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
                    clear={() => {
                        setMonth("");
                        setSelectedType("incoming");
                    }}
                    selectCb={(value) => {
                        setMonth(value);
                        setSelectedType("incoming")
                    }}
                />
            )}
        </div>
        {!month && <div className="flex items-center justify-center py-2">
            <p className="text-sm italic">
                Select{" "}
                <span className="font-bold text-primary text-lg">
                    Month
                </span>{" "}
                to generate monthly analytics
            </p>
        </div>}
        {(isMonthlyExpenseFetching || isMonthlyExpenseLoading) ?
            <AnalyticsLoading />
            :
            month && <ReportLayout selectOption={(option) => setSelectedType(option)} totalAmount={monthlyExpenseData?.data?.meta[selectedType]?.totalAmount}>
                {!monthlyExpenseDataDetails?.length && <div className="py-4">
                    <p className="text-light">No data found.</p>
                </div>}
                {monthlyExpenseDataDetails?.map((data) => (
                    <AnalyticsCard key={data.id} {...data} />
                ))}
            </ReportLayout>
        }
    </div>


}

export default MonthlyExpenses