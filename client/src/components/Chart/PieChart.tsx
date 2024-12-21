import { generateAccents } from "@common/utils/color";
import { formatCurrency } from "@common/utils/str";
import usePieChartResize from "@hooks/usePieChartResize";
import { PieChart as _PieChart } from "@mui/x-charts/PieChart";
import { FC } from "react";

interface PieChartData {
    id: string;
    value: number;
    label: string;
    percentage: number;
    totalAmount: string;
}

interface PieChartProps {
    data: PieChartData[];
}

const PieChart: FC<PieChartProps> = ({ data }) => {
    const { ref, resizeData } = usePieChartResize();

    return (
        <>
            <div className="md:h-52 h-44 w-full" ref={ref}>
                <_PieChart
                    colors={generateAccents("#427D9D", data.length, true)}
                    slotProps={{ legend: { hidden: true } }}
                    series={[
                        {
                            data,
                            valueFormatter: (val) => `${val.value}%`,
                            innerRadius: 20,
                            outerRadius: resizeData?.outerRadius,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            startAngle: -180,
                            endAngle: 180,
                            cx: resizeData?.cx,
                            cy: resizeData?.cy,
                        },
                    ]}
                />
            </div>
            <div className="flex flex-wrap">
                {data.map((analytic) => (
                    <div className="w-1/2" key={analytic.id}>
                        <div className="m-1  p-2">
                            <p className="text-lg font-bold text-secondary">
                                {analytic.label}{" "}
                                <span className="text-gray-500 font-normal text-xs">
                                    - {analytic.percentage}%
                                </span>
                            </p>
                            <p>{formatCurrency(analytic.totalAmount, "PHP")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PieChart;
