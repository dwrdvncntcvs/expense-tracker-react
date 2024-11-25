import { capitalize, formatCurrency } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { useAppDispatch } from "@hooks/storeHooks";
import { show } from "@store/slices/modal";
import { FC } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight, HiFunnel } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";

interface MonthlyExpenseHeaderProps {
    month: string;
    totalAmount: string;
    pagination: {
        hasPrev: boolean;
        hasNext: boolean;
        page: number;
    };
}

const MonthlyExpenseHeader: FC<MonthlyExpenseHeaderProps> = ({
    month,
    totalAmount,
    pagination,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchParamsArr = useSearchParams();

    const setSearchParams = searchParamsArr[1];

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
            </div>
            <div className="flex gap-4 items-center md:justify-end justify-between">
                {totalAmount && (
                    <span className="text-sm ml-2 text-gray-600 font-normal">
                        Total: {formatCurrency(totalAmount, "PHP")}
                    </span>
                )}
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
