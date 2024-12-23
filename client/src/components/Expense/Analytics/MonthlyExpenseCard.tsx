import { PieChartData } from "@_types/chart";
import { ExpenseReportByMonthData } from "@_types/reports";
import { PieChart } from "@components/Chart";
import { FC } from "react";

type MonthlyExpenseCardProps = {
    data: ExpenseReportByMonthData[]
    month: string;
}

const MonthlyExpenseCard: FC<MonthlyExpenseCardProps> = ({ month, data }) => {

    const chartData: PieChartData[] = data.map((_reportByMonth) => ({
        id: _reportByMonth.id,
        label: _reportByMonth.name,
        percentage: _reportByMonth.percentage,
        totalAmount: _reportByMonth.totalAmount,
        value: _reportByMonth.percentage
    }))

    return <div className="flex flex-col w-full h-full justify-center items-center">
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
}

export default MonthlyExpenseCard