import { IExpense } from "@_types/expense";
import { MONTHS } from "@common/constants";
import ActionButtons from "@components/ActionButtons";
import {
    MonthlyExpenseHeader,
    MonthlyExpenseItem,
    NoMonthlyExpense,
} from "@components/Expense";
import { MonthlyExpenseLoading } from "@components/LoadingScreen";
import { ExpenseFilterModal } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import api from "@store/queries/api";
import { useGetExpensesByMonthQuery } from "@store/queries/expense";
import { FC, useEffect } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

const ExpenseMonth: FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    searchParams.set("limit", "16");

    const { data, isLoading, isFetching } = useGetExpensesByMonthQuery({
        month: params?.month
            ? MONTHS[params?.month.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params?.year || "",
        query: searchParams.toString(),
    });

    useEffect(() => {
        if (
            !(searchParams.get("categoryId") ||
                searchParams.get("type")) &&
            !data?.data?.expenses?.data &&
            !isLoading
        ) {
            dispatch(api.util.invalidateTags(["expense-months"]));
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, data?.data?.expenses?.data, isLoading]);

    if (isLoading || isFetching) return <MonthlyExpenseLoading />;

    const metaData = data.data.expenses.metadata;
    const outgoingTotal = data.data.expenses.outgoingTotal;
    const incomingTotal = data.data.expenses.incomingTotal;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4 h-full">
            <MonthlyExpenseHeader
                month={params?.month || ""}
                pagination={metaData}
                outgoingTotal={outgoingTotal}
                incomingTotal={incomingTotal}
            />

            {!expenses && (searchParams.get("categoryId") || searchParams.get("type")) && (
                <NoMonthlyExpense />
            )}
            <div className="flex flex-wrap">
                {expenses &&
                    expenses?.map((expense, i) => (
                        <MonthlyExpenseItem
                            index={i}
                            expense={expense}
                            key={expense.id}
                        />
                    ))}
            </div>
            <ExpenseFilterModal />
            <Outlet />
            {(metaData.hasNext || metaData.hasPrev) && (
                <div className="flex justify-center items-center p-4 pt-0">
                    <ActionButtons
                        className="h-10 w-10 md:hidden justify-center items-center flex"
                        rounded="full"
                        options={[
                            {
                                type: "button",
                                bgColor: "primary",
                                color: "plain",
                                icon: HiArrowLeft,
                                disabled: !metaData.hasPrev,
                                onClick: () => {
                                    if (metaData.hasPrev)
                                        setSearchParams((val) => {
                                            val.set(
                                                "page",
                                                (metaData.page - 1).toString()
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
                                disabled: !metaData.hasNext,
                                onClick: () => {
                                    if (metaData.hasNext)
                                        setSearchParams((val) => {
                                            val.set(
                                                "page",
                                                (metaData.page + 1).toString()
                                            );
                                            return val;
                                        });
                                },
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default ExpenseMonth;
