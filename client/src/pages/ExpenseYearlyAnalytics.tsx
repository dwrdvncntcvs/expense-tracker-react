import { ExpenseType } from "@_types/expense";
import { AnalyticsCard } from "@components/Analytics";
import { AnalyticsModalLoading } from "@components/LoadingScreen";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { ReportsLayout } from "@layouts/index";
import { useGetExpensesYearlyAnalyticsQuery } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseYearlyAnalytics: FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [expenseType, setExpenseType] = useState<ExpenseType>("incoming");

    const { data, isLoading } = useGetExpensesYearlyAnalyticsQuery({
        year: params?.year ? +params.year : new Date().getFullYear(),
        expenseType: expenseType
    });

    useEffect(() => {
        if (params.year) {
            dispatch(show("yearly-expense-analytics"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const meta = data?.data.meta
    const reportData = data?.data.data

    return (
        <Modal
            name="yearly-expense-analytics"
            title={`${params?.year}'s Expenses Reports`}
            options={{
                closeCb: () => {
                    navigate("/", { replace: true });
                    dispatch(hide());
                },
            }}
        >
            {isLoading ? (
                <AnalyticsModalLoading />
            ) : (
                <ReportsLayout totalAmount={meta?.totalAmount} selectedType={expenseType} selectType={setExpenseType}>
                    {reportData?.map((data) => (
                        <AnalyticsCard key={data.id} {...data} />
                    ))}
                </ReportsLayout>
            )}
        </Modal>
    );
};

export default ExpenseYearlyAnalytics;
