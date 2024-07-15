import { FC } from "react";
import { BarChart as _BarChart } from "@mui/x-charts";
import { formatCurrency } from "@common/utils/str";
import { generateAccents } from "@common/utils/color";

interface BarChartData {
    id: string;
    label: string;
    percentage: number;
    totalAmount: string;
}

interface BarChartProps {
    data: BarChartData[];
}

const BarChart: FC<BarChartProps> = ({ data }) => {
    return (
        <div className="flex items-end w-full justify-end">
            <_BarChart
                slotProps={{ legend: { hidden: true } }}
                height={400}
                width={350}
                dataset={data.map((val) => ({
                    totalAmount: val.totalAmount,
                    label: val.label,
                }))}
                yAxis={[
                    {
                        scaleType: "band",
                        dataKey: "label",
                    },
                ]}
                xAxis={[
                    {
                        valueFormatter: (val: string) => {
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
                colors={generateAccents("#427D9D", data.length, true)}
                layout="horizontal"
                grid={{ vertical: true }}
                borderRadius={10}
            />
        </div>
    );
};

export default BarChart;
