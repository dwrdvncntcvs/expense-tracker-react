import { BarChart, PieChart } from "@components/Chart";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import ChartLayout from "@layouts/ChartLayout";
import { useGetExpensesYearlyAnalyticsQuery } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseYearlyAnalytics: FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetExpensesYearlyAnalyticsQuery({
        year: params?.year ? +params.year : new Date().getFullYear(),
    });

    useEffect(() => {
        if (params.year) {
            dispatch(show("yearly-expense-analytics"));
        }
    }, [params]);

    const metaData = data?.data.meta;
    const analyticsData = data?.data.data;

    console.log(
        analyticsData?.map((val) => {
            return {
                id: val.id,
                value: val.percentage,
                label: val.label,
                totalAmount: val.totalAmount,
                percentage: val.percentage,
            };
        })
    );

    return (
        <Modal
            name="yearly-expense-analytics"
            title={`${params?.year}'s Expenses Analytics`}
            options={{
                closeCb: () => {
                    navigate("/", { replace: true });
                    dispatch(hide());
                },
            }}
        >
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <>
                    <ChartLayout amount={metaData.totalAmount}>
                        {(chart) => (
                            <>
                                {chart === "pie" && (
                                    <PieChart
                                        data={analyticsData?.map((val) => {
                                            return {
                                                id: val.id,
                                                value: val.percentage,
                                                label: val.label,
                                                totalAmount: val.totalAmount,
                                                percentage: val.percentage,
                                            };
                                        })}
                                    />
                                )}
                                {chart === "bar" && (
                                    <BarChart data={analyticsData} />
                                )}
                            </>
                        )}
                    </ChartLayout>
                </>
            )}
        </Modal>
    );
};

export default ExpenseYearlyAnalytics;
