import { FC } from "react";
import { Link } from "react-router-dom";

interface ExpenseMonthListProps {
    data: string[];
    year: string;
}

export const ExpenseMonthList: FC<ExpenseMonthListProps> = ({ data, year }) => {
    return (
        <div className="flex gap-2">
            {data.map((month: string) => (
                <Link
                    to={`/${month}/${year}`}
                    key={month}
                    className="uppercase rounded-full bg-tertiary text-white text-xl w-20 h-20 flex items-center justify-center"
                >
                    {month.slice(0, 3)}
                </Link>
            ))}
        </div>
    );
};

export default ExpenseMonthList;
