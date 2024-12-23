import { MONTHS } from "@common/constants";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { LineChart } from "@mui/x-charts";
import { useGetExpensesYearlyAnalyticsPerCategoryQuery } from "@store/queries/expense";
import { FC } from "react";
import { useParams } from "react-router-dom";

const YearlyExpensesByCategory: FC = () => {
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

    if (isYearlyExpenseCatFetching ||
        isYearlyExpenseCatLoading)
        return <div className="rounded-lg p-2 px-4">
            <AnalyticsLoading />
        </div>

    return <div className="flex items-center w-full h-60 justify-center">
        <LineChart
            xAxis={[
                {
                    scaleType: "point",
                    data: Object.keys(MONTHS),
                },
            ]}
            series={yearlyExpenseCatData.data.data.map(
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
                    };
                }
            )}
        />
    </div>
}

export default YearlyExpensesByCategory