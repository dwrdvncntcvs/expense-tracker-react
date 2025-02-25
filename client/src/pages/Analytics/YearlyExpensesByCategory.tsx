import { ExpenseReportByCategoryData } from "@_types/reports";
import { MONTHS } from "@common/constants";
import { generateAccents } from "@common/utils/color";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { LineChart } from "@mui/x-charts";
import { useGetExpensesYearlyAnalyticsPerCategoryQuery } from "@store/queries/expense";
import { useTheme } from "@store/slices/theme";
import { capitalize } from "lodash-es";
import { FC } from "react";
import { useParams } from "react-router-dom";

const YearlyExpensesByCategory: FC = () => {
    const theme = useTheme()
    const params = useParams();
    const {
        data: yearlyExpenseCatData,
        isLoading: isYearlyExpenseCatLoading,
        isFetching: isYearlyExpenseCatFetching,
    } = useGetExpensesYearlyAnalyticsPerCategoryQuery(
        {
            year: params.year || "",
        },
        {
            skip: !params.year,
        }
    );

    const _yearlyExpenseCatData = yearlyExpenseCatData?.data.data as ExpenseReportByCategoryData[]

    if (isYearlyExpenseCatFetching ||
        isYearlyExpenseCatLoading)
        return <div className="rounded-lg p-2 px-4">
            <AnalyticsLoading />
        </div>

    return <div className="p-4 flex flex-col items-start w-full h-72 justify-center rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-primary py-2">
            Expenses Flow by Category
        </h1>
        <LineChart
            desc="Yearly Expenses by Category"
            slotProps={{ legend: { hidden: true } }}
            margin={{ top: 15, right: 20, bottom: 15, left: 20 }}
            height={200}
            colors={generateAccents(theme.color.primary, 100, true)}
            leftAxis={{ disableLine: true, disableTicks: true, tickLabelStyle: { display: "none" }, }}
            bottomAxis={{ disableLine: true, disableTicks: true, tickLabelStyle: { display: "none" } }}
            xAxis={[
                {
                    scaleType: "point",
                    data: Object.keys(MONTHS).map(key => capitalize(key)),
                },
            ]}
            series={_yearlyExpenseCatData.map(
                (category) => {
                    const dataSet = Object.keys(
                        MONTHS
                    )?.map((key) => {
                        const month =
                            +MONTHS[
                            key as keyof typeof MONTHS
                            ];

                        const totalAmount =
                            category?.months.find(
                                (val) =>
                                    val.month ===
                                    month
                            )?.totalAmount ||
                            undefined;

                        return totalAmount
                            ? totalAmount
                            : 0;
                    });

                    return {
                        label: category.categoryName,
                        data: dataSet,
                        showMark: false
                    };
                }
            )}
        />
    </div>
}

export default YearlyExpensesByCategory