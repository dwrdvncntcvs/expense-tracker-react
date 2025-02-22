import { formatCurrency } from "@common/utils/str";
import { Card } from "@components/common";
import { FC } from "react";

interface AnalyticsCardProps {
    name: string;
    percentage: number;
    totalAmount: number;
}

const AnalyticsCard: FC<AnalyticsCardProps> = ({ name, percentage, totalAmount }) => {
    return <Card className="w-full flex-1 space-y-4">
        <div className="flex justify-between items-center text-xs">
            <p className="text-sm">{name}</p>
            <p>{percentage}%</p>
        </div>
        <p>{formatCurrency(`${totalAmount}`, "PHP")}</p>
    </Card>
}

export default AnalyticsCard