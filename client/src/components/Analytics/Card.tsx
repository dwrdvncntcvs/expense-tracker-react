import { formatCurrency } from "@common/utils/str";
import { Card } from "@components/common";
import { FC } from "react";

interface AnalyticsCardProps {
    name: string;
    percentage: number;
    totalAmount: number;
    isSlim?: boolean;
}

const AnalyticsCard: FC<AnalyticsCardProps> = ({ name, percentage, totalAmount, isSlim }) => {
    return <Card className={`w-full flex-1 space-y-4`}>
        <div className="flex gap-2 justify-between items-center text-xs">
            <p className="text-sm">{name}</p>
            <p className={`${isSlim ? "bg-quaternary text-primary py-1 px-2 !text-xs rounded-xl" : ""}`}>{percentage}%</p>
        </div>
        {!isSlim &&
            <div className="flex items-center justify-end">
                <p >{formatCurrency(`${totalAmount}`, "PHP")}</p>
            </div>}
    </Card>
}

export default AnalyticsCard