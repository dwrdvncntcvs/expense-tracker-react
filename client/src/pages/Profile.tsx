import { MONTHS } from "@common/constants";
import { abbreviate } from "@common/utils/str";
import { Dropdown } from "@components/common";
import { NoExpenseYear } from "@components/Expense";
import { MonthlyExpenseCard, YearlyExpenseCard } from "@components/Expense/Analytics";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { UploadProfileImage } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import { LineChart, } from "@mui/x-charts";
import {
    useGetExpensesByMonthAnalyticsQuery,
    useGetExpensesQuery,
    useGetExpensesYearlyAnalyticsPerCategoryQuery,
    useGetExpensesYearlyAnalyticsQuery,
} from "@store/queries/expense";
import { useExpense } from "@store/slices/expense";
import { show } from "@store/slices/modal";
import { useUser } from "@store/slices/user";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile: FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { user } = useUser();

    const { expenses } = useExpense();

    useGetExpensesQuery();

    const [month, setMonth] = useState<string>("");

    const {
        data: yearlyExpenseData,
        isLoading: isYearlyExpenseLoading,
        isFetching: isYearlyExpenseFetching,
    } = useGetExpensesYearlyAnalyticsQuery(
        {
            year: params.year ? +params.year : 0,
        },
        {
            skip: !params.year,
        }
    );

    const {
        data: yearlyExpenseCatData,
        isLoading: isYearlyExpenseCatLoading,
        isFetching: isYearlyExpenseCatFetching,
    } = useGetExpensesYearlyAnalyticsPerCategoryQuery(
        {
            year: params.year || "",
        },
        {
            skip: !params.year,
        }
    );

    const {
        data: monthlyExpenseData,
        isLoading: isMonthlyExpenseLoading,
        isFetching: isMonthlyExpenseFetching,
    } = useGetExpensesByMonthAnalyticsQuery(
        {
            month: month,
            year: params.year || "",
        },
        { skip: !month || !params.year }
    );

    const yearlyExpensesDataDetails = yearlyExpenseData?.data?.data;
    const monthlyExpenseDataDetails = monthlyExpenseData?.data?.data

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
                            )}
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
                            canClear
                            selectCb={(value) => {
                                navigate(`/user/${value}`);
                            }}
                        />
                    </div>
                </div>
                {!params.year ? (
                    <NoExpenseYear />
                ) : (
                    <div className="flex h-full flex-wrap p-4 px-0">
                        <div className="md:p-4 py-2 rounded-xl md:w-1/2 w-full">
                            {isYearlyExpenseLoading || isYearlyExpenseFetching ? (
                                <div className="w-full p-2 px-4 rounded-lg">
                                    <AnalyticsLoading />
                                </div>
                            ) : (
                                <YearlyExpenseCard data={yearlyExpensesDataDetails} />
                            )}
                        </div>
                        <div className="p-4 md:w-1/2 w-full h-full  md:p-4 py-2 shadow-lg">
                            {isMonthlyExpenseFetching || isMonthlyExpenseLoading ? (
                                <div className=" p-2 px-4 rounded-lg">
                                    <AnalyticsLoading />
                                </div>
                            ) : (
                                <MonthlyExpenseCard month={month} setMonth={setMonth} data={monthlyExpenseDataDetails || []} />
                            )}
                        </div>
                        <div className="p-4 bg-quaternary w-full md:p-4 py-2  shadow-lg">

                            {isYearlyExpenseCatFetching ||
                                isYearlyExpenseCatLoading ? (
                                <div className="rounded-lg p-2 px-4">
                                    <AnalyticsLoading />
                                </div>
                            ) : (
                                <div className="w-full rounded-lg p-2 px-4 ">
                                    <h1 className="text-xl font-bold text-primary py-2">
                                        Yearly Expenses / Category
                                    </h1>
                                    <div className="flex items-center w-full h-60 justify-center">
                                        {yearlyExpenseCatData?.data?.data && (
                                            <LineChart
                                                xAxis={[
                                                    {
                                                        scaleType: "point",
                                                        data: Object.keys(MONTHS),
                                                    },
                                                ]}
                                                series={yearlyExpenseCatData.data.data.map(
                                                    (category) => {
                                                        const dataSet = Object.keys(
                                                            MONTHS
                                                        )?.map((key) => {
                                                            const month =
                                                                +MONTHS[
                                                                key as keyof typeof MONTHS
                                                                ];

                                                            const totalAmount =
                                                                category?.months.find(
                                                                    (val) =>
                                                                        val.month ===
                                                                        month
                                                                )?.totalAmount ||
                                                                undefined;

                                                            return totalAmount
                                                                ? totalAmount
                                                                : 0;
                                                        });

                                                        return {
                                                            label: category.categoryName,
                                                            data: dataSet,
                                                        };
                                                    }
                                                )}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <UploadProfileImage />
        </>
    );
};

export default Profile;
