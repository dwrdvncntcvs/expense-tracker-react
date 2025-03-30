import { abbreviate } from "@common/utils/str";
import { Dropdown } from "@components/common";
import { NoExpenseYear } from "@components/Expense";
import { UploadProfileImage } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import {
    useGetExpensesQuery
} from "@store/queries/expense";
import { useExpense } from "@store/slices/expense";
import { show } from "@store/slices/modal";
import { useUser } from "@store/slices/user";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YearlyExpenses, YearlyExpensesByCategory } from "./Analytics";
import MonthlyExpenses from "./Analytics/MonthlyExpenses";
import { ExpenseType } from "@_types/expense";
import { capitalize } from "lodash-es";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { IconType } from "react-icons";

type ExpenseTypeOptionObject = {
    [key in ExpenseType]: {
        icon: IconType,
        color: string
    };

}

const Profile: FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [expenseType, setExpenseType] = useState<ExpenseType>("incoming");

    const expenseTypes: ExpenseType[] = ["incoming", "outgoing"];
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

    const dispatch = useAppDispatch();
    const { user } = useUser();

    const { expenses } = useExpense();

    useGetExpensesQuery();

    return (
        <>
            <div className="flex h-full flex-col">
                <div className="flex gap-4 justify-between md:flex-row flex-col items-center">
                    <div className="flex items-center md:justify-normal justify-between gap-4 w-full">
                        <button
                            className="w-14 h-14 rounded-full flex items-center justify-center hover:opacity-80 transition-all bg-primary overflow-auto p-[2px] font-bold text-2xl text-white"
                            onClick={() => {
                                dispatch(show("upload-profile-image"));
                            }}
                        >
                            {user?.profileImage ? (
                                <img
                                    src={user?.profileImage}
                                    className="object-cover w-full h-full rounded-full"
                                    alt=""
                                />
                            ) : (
                                abbreviate(
                                    `${user?.first_name} ${user?.last_name}`,
                                    2
                                )
                            )}s
                        </button>
                        <div className="flex flex-col gap-2">
                            <p className="md:text-2xl text-lg font-bold text-primary">
                                Expenses Overview
                            </p>
                            <div className="md:self-start self-end">
                                <p className="text-sm font-semibold italic text-secondary">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <p className="text-xs italic text-gray-500">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 w-full items-center">
                        {params.year && (
                            <Dropdown
                                value={expenseType}
                                className="md:w-auto w-full"
                                buttonClassName="md:w-auto w-full"
                                label="Select type"
                                options={expenseTypes.map((option) => {
                                    const optionObject = optionsObject[option];
                                    return {
                                        label: capitalize(option),
                                        value: option,
                                        icon: optionObject.icon,
                                        iconColor: optionObject.color
                                    };
                                })}
                                shouldUpdateLabel
                                selectCb={(value) => {
                                    setExpenseType(value as ExpenseType);
                                }}
                            />
                        )}
                        <Dropdown
                            value={params.year || ""}
                            className="md:w-auto w-full"
                            buttonClassName="md:w-auto w-full"
                            label={params.year || "Select year"}
                            options={Object.keys(expenses).map((key) => ({
                                label: key,
                                value: key,
                            }))}
                            shouldUpdateLabel
                            selectCb={(value) => {
                                navigate(`/user/${value}`);
                            }}
                        />
                    </div>
                </div>
                {!params.year ? (
                    <NoExpenseYear />
                ) : (
                    <div className="grid grid-cols-5 gap-4 h-full flex-wrap p-4 px-0">
                        <div className="md:col-span-2 col-span-5 space-y-4">
                            <YearlyExpenses expenseType={expenseType} />
                        </div>
                        <div className="md:col-span-3 col-span-5 space-y-4">
                            <YearlyExpensesByCategory expenseType={expenseType} />
                            <MonthlyExpenses expenseType={expenseType} />
                        </div>
                    </div>
                )}
            </div>
            <UploadProfileImage />
        </>
    );
};

export default Profile;
