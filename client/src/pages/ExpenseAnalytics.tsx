import { MONTHS } from "@common/constants";
import { capitalize, formatCurrency } from "@common/utils/str";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useGetExpensesByMonthAnalyticsQuery } from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { generateAccents } from "@common/utils/color";

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
            <h1 className="text-sm text-gray-500 text-end">
                Total:{" "}
                <span className="text-lg text-primary font-semibold">
                    {formatCurrency(
                        data.data.expenseAnalytics.totalAmount,
                        "PHP"
                    )}
                </span>
            </h1>
            <PieChart
                colors={generateAccents(
                    "#427D9D",
                    data.data.categoriesExpenseAnalytics.length,
                    true
                )}
                height={300}
                width={470}
                slotProps={{ legend: { hidden: true } }}
                series={[
                    {
                        data: data.data.categoriesExpenseAnalytics.map(
                            (analytic) => ({
                                id: analytic.id,
                                value: analytic.percentage,
                                label: `${analytic.name} `,
                            })
                        ),
                        valueFormatter: (val) => `${val.value}%`,
                        innerRadius: 60,
                        outerRadius: 120,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        startAngle: -180,
                        endAngle: 180,
                        cx: 470 / 2.13,
                    },
                ]}
            />
            <div className="flex flex-wrap">
                {data.data.categoriesExpenseAnalytics.map((analytic) => (
                    <div className="w-1/2" key={analytic.id}>
                        <div className="m-1  p-2">
                            <p className="text-lg font-bold text-secondary">
                                {analytic.name}{" "}
                                <span className="text-gray-500 font-normal text-xs">
                                    - {analytic.percentage}%
                                </span>
                            </p>
                            <p>{formatCurrency(analytic.totalAmount, "PHP")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default ExpenseAnalytics;
