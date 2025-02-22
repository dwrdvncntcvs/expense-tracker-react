import { ExpenseType } from "@_types/expense";
import { MONTHS } from "@common/constants";
import { capitalize } from "@common/utils/str";
import { AnalyticsCard } from "@components/Analytics";
import { AnalyticsModalLoading } from "@components/LoadingScreen";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { ReportsLayout } from "@layouts";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ExpenseAnalytics: FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [option, setOption] = useState<ExpenseType>("incoming");

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const meta = data?.data?.meta[option]
    const reportData = data?.data?.data[option]


    return (
        <Modal
            title={`${capitalize(params.month || "")}'s Expenses Reports`}
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
                    <ReportsLayout
                        selectOption={(option) => {
                            console.log("Option Selected: ", option)
                            setOption(option)
                        }}
                        totalAmount={meta?.totalAmount}
                    >
                        <div className="grid grid-cols-2 gap-2 flex-wrap">
                            {reportData?.map((data) => (
                                <AnalyticsCard key={data.id} {...data} />
                            ))}
                        </div>
                        {reportData?.length === 0 && (
                            <div className="py-2">
                                <p className="text-start text-secondary">
                                    No data available
                                </p>
                            </div>
                        )}
                    </ReportsLayout>
                </>
            )}
        </Modal>
    );
};

export default ExpenseAnalytics;
