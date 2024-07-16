import { ExpenseMonthHeader, ExpenseMonthList } from "@components/Expense";
import { YearlyExpenseLoader } from "@components/LoadingScreen";
import { useGetExpensesQuery } from "@store/queries/expense";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Home: FC = () => {
    const { data, isLoading } = useGetExpensesQuery();

    if (isLoading) return <YearlyExpenseLoader />;

    if (Object.keys(data.months).length < 1)
        return (
            <div className="flex flex-col h-full justify-center items-center gap-4">
                <h2 className="text-5xl font-bold text-primary">
                    No Expenses Found!
                </h2>
                <div className="flex flex-col justify-center items-center text-gray-600">
                    <p>It looks like you haven't added any expenses yet.</p>
                    <p>
                        Start by clicking the
                        <span className="font-bold text-primary">
                            "Add Expense"
                        </span>{" "}
                        button to keep track of your spending.
                    </p>
                </div>
            </div>
        );

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
