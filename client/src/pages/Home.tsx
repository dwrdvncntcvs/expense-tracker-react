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

    if (data && Object.keys(data.months).length < 1) return <NoExpenses />;

    return (
        <>
            <ul className="year-list flex flex-col gap-5 divide-y divide-secondary overflow-y-auto">
                {data && Object.keys(data.months).sort((a, b) => Number(b) - Number(a)).map((key) => (
                    <li key={key} className="year-item space-y-6 py-3">
                        <div className="space-y-3">
                            <ExpenseMonthHeader year={key} />
                            <ExpenseMonthList
                                data={data.months[key]}
                                year={key}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <Outlet />
        </>
    );
};

export default Home;
