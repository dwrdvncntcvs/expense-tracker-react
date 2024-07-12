import { MONTHS } from "@common/constants";
import { capitalize, formatCurrency } from "@common/utils/str";
import { BarChart, PieChart } from "@components/Chart";
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

    const { data, isLoading } = useGetExpensesByMonthAnalyticsQuery({
        month: MONTHS[params.month?.toUpperCase() as keyof typeof MONTHS]
            ? MONTHS[params.month?.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params.year || "",
    });

    useEffect(() => {
        dispatch(show("expense-analytics"));
    }, []);

    if (isLoading) return <div>Loading...</div>;

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
            <>
                <ChartLayout amount={data.data.expenseAnalytics.totalAmount}>
                    {(chart) => (
                        <>
                            {chart === "pie" && (
                                <PieChart
                                    data={data.data.categoriesExpenseAnalytics.map(
                                        (analytic) => ({
                                            id: analytic.id,
                                            value: analytic.percentage,
                                            label: `${analytic.name} `,
                                            totalAmount: analytic.totalAmount,
                                            percentage: analytic.percentage,
                                        })
                                    )}
                                />
                            )}
                            {chart === "bar" && (
                                <BarChart
                                    data={data.data.categoriesExpenseAnalytics.map(
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
        </Modal>
    );
};

export default ExpenseAnalytics;
