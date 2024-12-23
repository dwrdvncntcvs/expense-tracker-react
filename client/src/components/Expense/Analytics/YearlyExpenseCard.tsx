import { BarChartData } from "@_types/chart"
import { ExpenseReportByYearData } from "@_types/reports"
import { BarChart } from "@components/Chart"
import { FC } from "react"

interface YearlyExpenseCardProps {
    data: ExpenseReportByYearData[]
}

const YearlyExpenseCard: FC<YearlyExpenseCardProps> = ({ data }) => {
    const chartData: BarChartData[] = data.map(_yearlyReport => ({
        id: _yearlyReport.id,
        label: _yearlyReport.label,
        totalAmount: _yearlyReport.totalAmount,
        percentage: _yearlyReport.percentage
    }))


    return <div className="p-2 px-4 rounded-lg shadow-lg">
        <div className="w-full">
            <h1 className="text-xl font-bold text-primary py-2">
                Yearly Expenses
            </h1>
        </div>
        <div className="flex items-center justify-center">
            {data && (
                <BarChart data={chartData} />
            )}
        </div>
    </div>
}

export default YearlyExpenseCard