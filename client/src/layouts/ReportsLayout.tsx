import { ExpenseType } from "@_types/expense";
import { formatCurrency } from "@common/utils/str";
import { capitalize } from "lodash-es";
import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";

export type ReportLayoutProps = PropsWithChildren<{
    selectType?: (option: ExpenseType) => void
    totalAmount?: number,
    col?: number,
    selectedType: ExpenseType
}>

const ReportLayout: FC<ReportLayoutProps> = ({ children, selectType, totalAmount, col, selectedType }) => {
    type ExpenseTypeOptionObject = {
        [key in ExpenseType]: {
            icon: IconType,
            color: string
        };
    }

    if (!col) col = 2

    const options: ExpenseType[] = ["incoming", "outgoing"]
    const optionsObject: ExpenseTypeOptionObject = {
        incoming: {
            icon: HiArrowTrendingUp,
            color: "var(--success)"
        },
        outgoing: {
            icon: HiArrowTrendingDown,
            color: "var(--failure)"
        }
    }

    const column: string[] = [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-5",
        "grid-cols-6",
        "grid-cols-7",
        "grid-cols-8",
        "grid-cols-9",
        "grid-cols-10",
        "grid-cols-11",
        "grid-cols-12",
    ]

    return <div className="flex flex-col gap-2">
        <div className={`flex transition-all ${selectType ? "justify-between" : "justify-end"} items-center py-2`}>
            {selectType &&
                <div className="flex overflow-auto">
                    {options.map((option) => {
                        const optionObject = optionsObject[option]
                        return (
                            <button
                                key={option}
                                className={`${selectedType === option
                                    ? "bg-primary text-white"
                                    : " text-gray-800"
                                    } px-4 py-2 flex items-center gap-2 rounded-lg`}
                                onClick={() => {
                                    if (selectType)
                                        selectType(option)
                                }}
                            >
                                <p className="text-sm">
                                    {capitalize(option)}
                                </p>
                                <optionObject.icon color={optionObject.color} />
                            </button>
                        )
                    })}
                </div>}
            {totalAmount && <p className="text-sm">
                Total: {formatCurrency(`${totalAmount}`, "PHP")}
            </p>}
        </div>
        <div className={`grid ${column[col - 1]} gap-2 flex-wrap`}>
            {children}
        </div>
    </div>
}

export default ReportLayout