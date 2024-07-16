import { generateAccents } from "@common/utils/color";
import { PieChart as _PieChart } from "@mui/x-charts/PieChart";
import { formatCurrency } from "@common/utils/str";
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
    return (
        <>
            <_PieChart
                colors={generateAccents("#427D9D", data.length, true)}
                height={300}
                width={470}
                slotProps={{ legend: { hidden: true } }}
                series={[
                    {
                        data,
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
