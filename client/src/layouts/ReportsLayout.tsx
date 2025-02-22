import { ExpenseType } from "@_types/expense";
import { formatCurrency } from "@common/utils/str";
import { capitalize } from "lodash-es";
import { FC, PropsWithChildren, useState } from "react";
import { IconType } from "react-icons";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";

export type ReportLayoutProps = PropsWithChildren<{
    selectOption?: (option: ExpenseType) => void
    totalAmount?: number
}>

const ReportLayout: FC<ReportLayoutProps> = ({ children, selectOption, totalAmount }) => {
    type ExpenseTypeOptionObject = {
        [key in ExpenseType]: {
            icon: IconType,
            color: string
        };
    }

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

    const [selectedOption, setSelectedOption] = useState<ExpenseType>("incoming")

    return <div className="flex flex-col gap-2">
        <div className={`flex ${selectOption ? "justify-between" : "justify-end"} items-center py-2`}>
            {selectOption &&
                <div className="flex overflow-auto">
                    {options.map((option) => {
                        const optionObject = optionsObject[option]
                        return (
                            <button
                                key={option}
                                className={`${selectedOption === option
                                    ? "bg-primary text-white"
                                    : " text-gray-800"
                                    } px-4 py-2 flex items-center gap-2 rounded-lg`}
                                onClick={() => {
                                    setSelectedOption(option)
                                    if (selectOption)
                                        selectOption(option)
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
        {children}
    </div>
}

export default ReportLayout