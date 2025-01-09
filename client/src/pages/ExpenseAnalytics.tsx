import { MONTHS } from "@common/constants";
import { capitalize } from "@common/utils/str";
import { BarChart, PieChart } from "@components/Chart";
import { AnalyticsModalLoading } from "@components/LoadingScreen";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import ChartLayout from "@layouts/ChartLayout";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ExpenseAnalytics: FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useGetExpensesByMonthAnalyticsQuery(
        {
            month: MONTHS[params.month?.toUpperCase() as keyof typeof MONTHS]
                ? MONTHS[params.month?.toUpperCase() as keyof typeof MONTHS]
                : "",
            year: params.year || "",
        }
    );

    useEffect(() => {
        dispatch(show("expense-analytics"));
    }, []);

    return (
        <Modal
            title={`${capitalize(params.month || "")}'s Expenses Analytics`}
            name="expense-analytics"
            options={{
                closeCb: () => {
                    dispatch(hide());
                    navigate(`/${params.month}/${params.year}`);
                },
            }}
        >
            {isLoading || isFetching ? (
                <AnalyticsModalLoading />
            ) : (
                <>
                    <ChartLayout
                        amount={data?.data.data.meta?.totalAmount}
                    >
                        {(chart) => (
                            <>
                                {chart === "pie" && (
                                    <PieChart
                                        data={data?.data.data?.map(
                                            (analytic) => ({
                                                id: analytic.id,
                                                value: analytic.percentage,
                                                label: `${analytic.name} `,
                                                totalAmount:
                                                    analytic.totalAmount,
                                                percentage: analytic.percentage,
                                            })
                                        )}
                                    />
                                )}
                                {chart === "bar" && (
                                    <BarChart
                                        data={data?.data.data?.map(
                                            (val) => ({
                                                ...val,
                                                id: val.id,
                                                label: val.name,
                                            })
                                        )}
                                    />
                                )}
                            </>
                        )}
                    </ChartLayout>
                </>
            )}
        </Modal>
    );
};

export default ExpenseAnalytics;
