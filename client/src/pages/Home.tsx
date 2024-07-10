import { ExpenseMonthHeader, ExpenseMonthList } from "@components/Expense";
import { useGetExpensesQuery } from "@store/queries/expense";
import { FC } from "react";

const Home: FC = () => {
    const { data, isLoading } = useGetExpensesQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-5">
            {Object.keys(data.months).map((key) => (
                <div key={key} className="space-y-3">
                    <ExpenseMonthHeader year={key} />
                    <ExpenseMonthList data={data.months[key]} year={key} />
                </div>
            ))}
        </div>
    );
};

export default Home;
