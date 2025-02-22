import { PieChartData } from "@_types/chart";
import { generateAccents } from "@common/utils/color";
import usePieChartResize from "@hooks/usePieChartResize";
import { PieChart as _PieChart } from "@mui/x-charts/PieChart";
import { FC } from "react";

type ChartObjectData = {
    [key: string]: PieChartData[];
}
interface PieChartProps {
    data: ChartObjectData;
}

const PieChart: FC<PieChartProps> = ({ data }) => {
    const { ref, resizeData } = usePieChartResize();

    type ColorObject = {
        [key in keyof typeof data]: string;
    }

    const colors: ColorObject = {
        "outgoing": "#eb445a",
        "incoming": "#2dd36f",
    }

    return (
        <>
            <div className="md:h-52 h-44 w-full" ref={ref}>
                <_PieChart
                    slotProps={{ legend: { hidden: true } }}
                    series={Object.keys(data).map((key, i) => {
                        const _data = data[key];
                        const index = i + 1

                        return {
                            data: _data.map((_d, j) => {
                                const accentColors = generateAccents(colors[key], _data.length, true)
                                return ({ ..._d, color: accentColors[j] })
                            }),
                            valueFormatter: (val) => `${val.value}%`,
                            innerRadius: 50,
                            outerRadius: resizeData?.outerRadius * index - resizeData?.subtractOuterRadiusVal,
                            paddingAngle: 2,
                            cornerRadius: 6,
                            startAngle: -180,
                            endAngle: 180,
                            cx: resizeData?.cx,
                            cy: resizeData?.cy,
                        }
                    })}
                />
            </div>
            {/* <div className="flex flex-wrap">
                {data.map((analytic) => (
                    <div className="w-1/2" key={analytic.id}>
                        <div className="m-1  p-2">
                            <p className="text-lg font-bold text-secondary">
                                {analytic.label}{" "}
                                <span className="text-gray-500 font-normal text-xs">
                                    - {analytic.percentage}%
                                </span>
                            </p>
                            <p>{formatCurrency(typeof analytic.totalAmount === "number" ? analytic.totalAmount.toString() : analytic.totalAmount, "PHP")}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default PieChart;
