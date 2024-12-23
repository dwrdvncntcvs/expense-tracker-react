import { FC } from "react";
import { BarChart as _BarChart } from "@mui/x-charts";
import { formatCurrency } from "@common/utils/str";
import { generateAccents } from "@common/utils/color";
import { BarChartData } from "@_types/chart";

interface BarChartProps {
    data: BarChartData[];
}

const BarChart: FC<BarChartProps> = ({ data }) => {
    return (
        <div className="flex items-end w-full md:h-96 h-56 justify-end">
            <_BarChart
                slotProps={{ legend: { hidden: true }, }}
                dataset={data.map((val) => ({
                    totalAmount: val.totalAmount,
                    label: val.label.slice(0, 3),
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
                sx={{ padding: 0 }}
                margin={{ top: 25 }}
            />
        </div>
    );
};

export default BarChart;
