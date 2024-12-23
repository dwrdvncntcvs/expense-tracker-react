import { PieChartData } from "@_types/chart";
import { ExpenseReportByMonthData } from "@_types/reports";
import { MONTHS } from "@common/constants";
import { PieChart } from "@components/Chart";
import { Dropdown } from "@components/common";
import { useExpense } from "@store/slices/expense";
import { capitalize } from "lodash-es";
import { Dispatch, FC, SetStateAction } from "react";
import { useParams } from "react-router-dom";

type MonthlyExpenseCardProps = {
    month: string;
    setMonth: Dispatch<SetStateAction<string>>
    data: ExpenseReportByMonthData[]
}

const MonthlyExpenseCard: FC<MonthlyExpenseCardProps> = ({ month, setMonth, data }) => {
    const params = useParams();
    const { expenses } = useExpense();

    const chartData: PieChartData[] = data.map((_reportByMonth) => ({
        id: _reportByMonth.id,
        label: _reportByMonth.name,
        percentage: _reportByMonth.percentage,
        totalAmount: _reportByMonth.totalAmount,
        value: _reportByMonth.percentage
    }))

    console.log(chartData)


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
        <div className="flex flex-col w-full h-full justify-center items-center">
            {!month ? (
                <p className="text-sm italic">
                    Select{" "}
                    <span className="font-bold text-primary text-lg">
                        Month
                    </span>{" "}
                    to generate monthly analytics
                </p>
            ) : (
                <PieChart data={chartData} />

            )}
        </div>
    </div>
}

export default MonthlyExpenseCard