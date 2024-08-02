import { formatCurrency } from "@common/utils/str";
import Button from "@components/Button";
import { useAppDispatch } from "@hooks/storeHooks";
import { changeChart, ChartType, useChart } from "@store/slices/chart";
import { FC, ReactNode } from "react";
import { HiChartBar, HiChartPie } from "react-icons/hi";

interface ChartLayoutProps {
    children: (chart: ChartType) => ReactNode;
    amount?: string;
}

const ChartLayout: FC<ChartLayoutProps> = ({ children, amount }) => {
    const dispatch = useAppDispatch();
    const { chart } = useChart();

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex">
                    <Button
                        className={`w-10 h-10 flex justify-center items-center ${
                            chart === "bar" ? "pointer-events-none" : ""
                        }`}
                        rounded="xl"
                        onClick={() => dispatch(changeChart("bar"))}
                        bgColor={chart === "bar" ? "primary" : "quaternary"}
                        color={chart === "bar" ? "quaternary" : "primary"}
                    >
                        <HiChartBar size={20} />
                    </Button>
                    <Button
                        className="w-10 h-10 flex justify-center items-center"
                        rounded="xl"
                        onClick={() => dispatch(changeChart("pie"))}
                        bgColor={chart === "pie" ? "primary" : "quaternary"}
                        color={chart === "pie" ? "quaternary" : "primary"}
                    >
                        <HiChartPie size={20} />
                    </Button>
                </div>
                {amount && (
                    <h1 className="text-sm text-gray-500 text-end">
                        Total:{" "}
                        <span className="text-lg text-primary font-semibold">
                            {formatCurrency(amount, "PHP")}
                        </span>
                    </h1>
                )}
            </div>
            {children(chart)}
        </>
    );
};

export default ChartLayout;
