import {
    ExpenseMonthHeader,
    ExpenseMonthList,
    NoExpenses,
} from "@components/Expense";
import { YearlyExpenseLoader } from "@components/LoadingScreen";
import { useGetExpensesQuery } from "@store/queries/expense";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Home: FC = () => {
    const { data, isLoading } = useGetExpensesQuery();

    if (isLoading) return <YearlyExpenseLoader />;

    if (Object.keys(data.months).length < 1) return <NoExpenses />;

    return (
        <div className="flex flex-col gap-5 divide-y divide-secondary">
            {Object.keys(data.months).map((key) => (
                <div key={key} className="space-y-6 py-3">
                    <div className="space-y-3">
                        <ExpenseMonthHeader year={key} />
                        <ExpenseMonthList data={data.months[key]} year={key} />
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    );
};

export default Home;
