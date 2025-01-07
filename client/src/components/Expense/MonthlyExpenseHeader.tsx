import { capitalize, formatCurrency } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { Tag } from "@components/common";
import { useAppDispatch } from "@hooks/storeHooks";
import { show } from "@store/slices/modal";
import { FC } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight, HiFunnel } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";

interface MonthlyExpenseHeaderProps {
    month: string;
    outgoingTotal: string;
    incomingTotal: string;
    pagination: {
        hasPrev: boolean;
        hasNext: boolean;
        page: number;
    };
}

const MonthlyExpenseHeader: FC<MonthlyExpenseHeaderProps> = ({
    month,
    outgoingTotal,
    incomingTotal,
    pagination,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchParamsArr = useSearchParams();

    const setSearchParams = searchParamsArr[1];

    const isOverSpend = parseFloat(outgoingTotal) > parseFloat(incomingTotal);
    const totalSaved = parseFloat(incomingTotal) - parseFloat(outgoingTotal);

    return (
        <div className="flex md:gap-0 gap-2 md:flex-wrap flex-col justify-between md:h-10">
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => navigate("/", { replace: true })}
                    className="text-primary rounded-full h-10 w-10 flex justify-center items-center hover:border-2 hover:border-primary"
                >
                    <HiArrowLeft size={20} />
                </button>
                {month && (
                    <h2 className="font-bold text-3xl text-primary">
                        {capitalize(month)}{" "}
                    </h2>
                )}
                {isOverSpend && <Tag id='overbudget' bgColor="failure">Overbudget</Tag>}
                {totalSaved > 0 && <Tag id="savings">Savings: {formatCurrency(totalSaved.toString(), "PHP")}</Tag>}
            </div>
            <div className="flex gap-4 items-center md:justify-end justify-between">
                <div className="flex flex-col items-end">
                    {incomingTotal && (
                        <span className="text-sm text-success ml-2 flex gap-2 items-center font-normal">
                            <span className="font-bold text-xs">IN</span> {formatCurrency(incomingTotal, "PHP")}
                        </span>
                    )}
                    {outgoingTotal && (
                        <span className="text-sm ml-2 text-failure flex gap-2 items-center font-normal">
                            <span className="font-bold text-xs">OUT</span> {formatCurrency(outgoingTotal, "PHP")}
                        </span>
                    )}
                </div>
                <div className="flex md:gap-4 gap-2">
                    <ActionButtons
                        rounded="full"
                        className="h-10 w-10 flex justify-center items-center"
                        options={[
                            {
                                type: "button",
                                bgColor: "secondary",
                                color: "plain",
                                icon: HiFunnel,
                                onClick: () => {
                                    dispatch(show("expense-filter"));
                                },
                            },
                            {
                                type: "button",
                                bgColor: "secondary",
                                color: "plain",
                                icon: HiTrendingUp,
                                onClick: () => {
                                    navigate(`analytics`);
                                },
                            },
                        ]}
                    />
                    {(pagination.hasNext || pagination.hasPrev) && (
                        <ActionButtons
                            className="h-10 w-10 md:flex justify-center items-center hidden"
                            rounded="full"
                            options={[
                                {
                                    type: "button",
                                    bgColor: "primary",
                                    color: "plain",
                                    icon: HiArrowLeft,
                                    disabled: !pagination.hasPrev,
                                    onClick: () => {
                                        if (pagination.hasPrev)
                                            setSearchParams((val) => {
                                                val.set(
                                                    "page",
                                                    (
                                                        pagination.page - 1
                                                    ).toString()
                                                );
                                                return val;
                                            });
                                    },
                                },
                                {
                                    type: "button",
                                    bgColor: "primary",
                                    color: "plain",
                                    icon: HiArrowRight,
                                    disabled: !pagination.hasNext,
                                    onClick: () => {
                                        if (pagination.hasNext)
                                            setSearchParams((val) => {
                                                val.set(
                                                    "page",
                                                    (
                                                        pagination.page + 1
                                                    ).toString()
                                                );
                                                return val;
                                            });
                                    },
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthlyExpenseHeader;
