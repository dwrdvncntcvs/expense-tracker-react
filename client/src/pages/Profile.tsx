import { MONTHS } from "@common/constants";
import { generateAccents } from "@common/utils/color";
import { abbreviate, capitalize, formatCurrency } from "@common/utils/str";
import { AnalyticsLoading } from "@components/LoadingScreen";
import { UploadProfileImage } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
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
import { HiTrendingUp } from "react-icons/hi";
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

    return (
        <>
            <div className="flex h-full flex-col">
                <div className="flex gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
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
                            <p className="text-2xl font-bold text-primary">
                                Expenses Overview
                            </p>
                            <div>
                                <p className="text-sm font-semibold italic text-secondary">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <p className="text-xs italic text-gray-500">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <select
                            className="font-bold text-3xl w-auto text-primary text-end appearance-none p-2"
                            name="year"
                            id="year"
                            value={params.year}
                            onChange={(e) => {
                                setMonth("");
                                navigate(`/user/${e.target.value}`);
                            }}
                        >
                            <option
                                value=""
                                className="text-sm p-2 text-center"
                            >
                                Select Year
                            </option>
                            {Object.keys(expenses).map((key) => (
                                <option
                                    key={key}
                                    value={key}
                                    className="text-sm p-2 text-center"
                                >
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {!params.year ? (
                    <div className="flex flex-col justify-center items-center h-full gap-4">
                        <div className="flex items-center text-5xl text-primary font-bold">
                            Expenses Analytics
                            <HiTrendingUp size={50} className="text-primary" />
                        </div>
                        <div className="text-center text-light italic">
                            <p>
                                Currently you haven't selected a year to
                                generate your yearly expenses.
                            </p>
                            <p>
                                Click "
                                <span className="font-bold text-primary">
                                    Select Year
                                </span>
                                " to generate your yearly expenses analytics.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 grid-rows-2 h-full p-4 px-0 gap-2">
                        {isYearlyExpenseLoading || isYearlyExpenseFetching ? (
                            <div className="col-span-1 row-span-1 shadow-md border p-2 px-4 rounded-lg">
                                <AnalyticsLoading />
                            </div>
                        ) : (
                            <div className="col-span-1 row-span-1 shadow-md border p-2 px-4 rounded-lg">
                                <div className="w-full">
                                    <h1 className="text-xl font-bold text-primary py-2">
                                        Yearly Expenses
                                    </h1>
                                </div>
                                <div className="flex items-center justify-center">
                                    {yearlyExpensesDataDetails && (
                                        <BarChart
                                            height={300}
                                            width={500}
                                            slotProps={{
                                                legend: { hidden: true },
                                            }}
                                            dataset={yearlyExpensesDataDetails?.map(
                                                (val) => ({
                                                    totalAmount:
                                                        val.totalAmount,
                                                    label: val.label.slice(
                                                        0,
                                                        3
                                                    ),
                                                })
                                            )}
                                            yAxis={[
                                                {
                                                    scaleType: "band",
                                                    dataKey: "label",
                                                    position: "right",
                                                },
                                            ]}
                                            xAxis={[
                                                {
                                                    valueFormatter: (
                                                        val: string
                                                    ) => {
                                                        return formatCurrency(
                                                            `${val}`,
                                                            "PHP"
                                                        );
                                                    },
                                                },
                                            ]}
                                            series={[
                                                {
                                                    dataKey: "totalAmount",
                                                    label: "Total Amount",
                                                    valueFormatter: (val) => {
                                                        return formatCurrency(
                                                            `${val}`,
                                                            "PHP"
                                                        );
                                                    },
                                                },
                                            ]}
                                            colors={generateAccents(
                                                "#427D9D",
                                                yearlyExpenseData.data.data
                                                    .length,
                                                true
                                            )}
                                            layout="horizontal"
                                            grid={{ vertical: true }}
                                            borderRadius={10}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {isMonthlyExpenseFetching || isMonthlyExpenseLoading ? (
                            <div className="col-span-1 row-span-1 shadow-md border p-2 px-4 rounded-lg">
                                <AnalyticsLoading />
                            </div>
                        ) : (
                            <div className="col-span-1 row-span-1 shadow-md border p-2 px-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold text-primary py-2">
                                        Monthly Expenses per Category
                                    </h1>
                                    {params?.year && (
                                        <select
                                            name="month"
                                            id="month"
                                            className="appearance-none p-2 text-center text-secondary"
                                            value={month}
                                            onChange={(e) => {
                                                setMonth(e.target.value);
                                            }}
                                        >
                                            <option value={""}>
                                                {"Select Month"}
                                            </option>
                                            {expenses[params.year] &&
                                                expenses[params.year].map(
                                                    (month) => (
                                                        <option
                                                            key={month}
                                                            value={
                                                                MONTHS[
                                                                    month.toUpperCase() as keyof typeof MONTHS
                                                                ]
                                                            }
                                                        >
                                                            {capitalize(month)}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    )}
                                </div>
                                <div className="flex w-full h-full justify-center items-center">
                                    {!month ? (
                                        <p className="text-sm italic">
                                            Select{" "}
                                            <span className="font-bold text-primary text-lg">
                                                Month
                                            </span>{" "}
                                            to generate monthly analytics
                                        </p>
                                    ) : (
                                        <PieChart
                                            colors={generateAccents(
                                                "#427D9D",
                                                monthlyExpenseData?.data
                                                    ?.categoriesExpenseAnalytics
                                                    .length
                                            )}
                                            height={300}
                                            width={450}
                                            className="flex items-center justify-center"
                                            series={[
                                                {
                                                    data:
                                                        monthlyExpenseData?.data?.categoriesExpenseAnalytics?.map(
                                                            (val) => ({
                                                                ...val,
                                                                value: val.percentage,
                                                                label: val.name,
                                                            })
                                                        ) || [],
                                                    valueFormatter: (val) =>
                                                        `${val.value}%`,
                                                    innerRadius: 60,
                                                    outerRadius: 120,
                                                    paddingAngle: 2,
                                                    cornerRadius: 4,
                                                    startAngle: -180,
                                                    endAngle: 180,
                                                    cy: 120,
                                                    cx: 130,
                                                },
                                            ]}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {isYearlyExpenseCatFetching ||
                        isYearlyExpenseCatLoading ? (
                            <div className="shadow-md border col-span-2 rounded-lg p-2 px-4">
                                <AnalyticsLoading />
                            </div>
                        ) : (
                            <div className="shadow-md border col-span-2 rounded-lg p-2 px-4">
                                <h1 className="text-xl font-bold text-primary py-2">
                                    Yearly Expenses / Category
                                </h1>
                                <div className="flex items-center justify-center">
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
                                                    ).map((key) => {
                                                        const month =
                                                            +MONTHS[
                                                                key as keyof typeof MONTHS
                                                            ];

                                                        const totalAmount =
                                                            category.months.find(
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
                                            width={1200}
                                            height={300}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <UploadProfileImage />
        </>
    );
};

export default Profile;
