import { ExpenseReportByYearData } from "@_types/reports"
import { AnalyticsCard } from "@components/Analytics"
import { ReportsLayout } from "@layouts/index"
import { FC } from "react"

interface YearlyExpenseCardProps {
    data?: ExpenseReportByYearData[]
}

const YearlyExpenseCard: FC<YearlyExpenseCardProps> = ({ data }) => {
    const totalAmount = data?.reduce((acc, curr) => {
        acc += +curr.totalAmount
        return acc
    }, 0)

    return <div className="p-4 rounded-lg shadow-lg">
        <div className="w-full">
            <h1 className="text-xl font-bold text-primary py-2">
                Yearly Expenses
            </h1>
        </div>
        <ReportsLayout totalAmount={totalAmount} col={2} >
            {!data || !data?.length && <div className="p-2">
                <p className="text-center text-gray-500">No data available</p>
            </div>}
            {data?.map(item => <AnalyticsCard key={item.id} {...item} />)}
        </ReportsLayout>
    </div>
}

export default YearlyExpenseCard