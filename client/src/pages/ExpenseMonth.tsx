import { IExpense } from "@_types/expense";
import { MONTHS } from "@common/constants";
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
    const [searchParams] = useSearchParams();

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
            !searchParams.get("categoryId") &&
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
    const totalAmount = data.data.expenses.totalAmount;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4 h-full">
            <MonthlyExpenseHeader
                month={params?.month || ""}
                pagination={metaData}
                totalAmount={totalAmount}
            />

            {!expenses && searchParams.get("categoryId") && (
                <NoMonthlyExpense />
            )}
            <div className="flex flex-wrap">
                {expenses &&
                    expenses?.map((expense) => (
                        <MonthlyExpenseItem
                            expense={expense}
                            key={expense.id}
                        />
                    ))}
            </div>
            <ExpenseFilterModal />
            <Outlet />
        </div>
    );
};

export default ExpenseMonth;
