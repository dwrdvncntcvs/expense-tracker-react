import { generateAccents } from "@common/utils/color";
import { formatCurrency } from "@common/utils/str";
import Button from "@components/Button";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { BarChart, PieChart } from "@mui/x-charts";
import { useGetExpensesYearlyAnalyticsQuery } from "@store/queries/expense";
import { show } from "@store/slices/modal";
import { FC, useEffect, useState } from "react";
import { HiChartBar, HiChartPie } from "react-icons/hi2";
import { useParams } from "react-router-dom";

const ExpenseYearlyAnalytics: FC = () => {
    const params = useParams();

    const [chartType, setChartType] = useState<"bar" | "pie">("bar");

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

    return (
        <Modal
            name="yearly-expense-analytics"
            title={`${params?.year}'s Expenses Analytics`}
        >
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            <Button
                                className={`w-10 h-10 flex justify-center items-center ${
                                    chartType === "bar"
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                                rounded="xl"
                                onClick={() => setChartType("bar")}
                                bgColor={
                                    chartType === "bar" ? "primary" : "plain"
                                }
                                color={
                                    chartType === "bar" ? "plain" : "primary"
                                }
                            >
                                <HiChartBar size={20} />
                            </Button>
                            <Button
                                className="w-10 h-10 flex justify-center items-center"
                                rounded="xl"
                                onClick={() => setChartType("pie")}
                                bgColor={
                                    chartType === "pie" ? "primary" : "plain"
                                }
                                color={
                                    chartType === "pie" ? "plain" : "primary"
                                }
                            >
                                <HiChartPie size={20} />
                            </Button>
                        </div>
                        <h1 className="text-sm text-gray-500 text-end">
                            Total:{" "}
                            <span className="text-lg text-primary font-semibold">
                                {formatCurrency(metaData.totalAmount, "PHP")}
                            </span>
                        </h1>
                    </div>
                    {chartType === "pie" && (
                        <>
                            <PieChart
                                colors={generateAccents(
                                    "#427D9D",
                                    analyticsData.length,
                                    true
                                )}
                                height={300}
                                width={470}
                                slotProps={{ legend: { hidden: true } }}
                                series={[
                                    {
                                        data: analyticsData.map((val) => ({
                                            id: val.id,
                                            value: val.percentage,
                                            label: val.label,
                                        })),
                                        valueFormatter: (val) =>
                                            `${val.value}%`,
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
                                {analyticsData.map((analytic) => (
                                    <div className="w-1/2" key={analytic.id}>
                                        <div className="m-1  p-2">
                                            <p className="text-lg font-bold text-secondary">
                                                {analytic.label}{" "}
                                                <span className="text-gray-500 font-normal text-xs">
                                                    - {analytic.percentage}%
                                                </span>
                                            </p>
                                            <p>
                                                {formatCurrency(
                                                    analytic.totalAmount,
                                                    "PHP"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {chartType === "bar" && (
                        <BarChart
                            slotProps={{ legend: { hidden: true } }}
                            height={400}
                            width={470}
                            dataset={analyticsData.map((val) => ({
                                totalAmount: val.totalAmount,
                                month: `${val.label.slice(0, 3)}`,
                            }))}
                            yAxis={[{ scaleType: "band", dataKey: "month" }]}
                            xAxis={[
                                {
                                    valueFormatter: (val) => {
                                        return formatCurrency(`${val}`, "PHP");
                                    },
                                },
                            ]}
                            series={[
                                {
                                    dataKey: "totalAmount",
                                    label: "Total Amount",
                                    valueFormatter: (val) => {
                                        return formatCurrency(`${val}`, "PHP");
                                    },
                                },
                            ]}
                            colors={generateAccents(
                                "#427D9D",
                                analyticsData.length,
                                true
                            )}
                            layout="horizontal"
                            className="w-full"
                        />
                    )}
                </div>
            )}
        </Modal>
    );
};

export default ExpenseYearlyAnalytics;
