import { FC } from "react";
import { Link } from "react-router-dom";

interface ExpenseMonthListProps {
    data: string[];
    year: string;
}

export const ExpenseMonthList: FC<ExpenseMonthListProps> = ({ data, year }) => {
    return (
        <ul
            className="month-list flex items-center justify-center gap-2"
            id={year}
        >
            {data.map((month: string) => (
                <li key={month} className="month-item">
                    <Link
                        to={`/${month}/${year}`}
                        id={`${month}-${year}`}
                        className="uppercase rounded-full bg-tertiary text-white text-xl w-20 h-20 flex items-center justify-center hover:bg-secondary transition-all"
                    >
                        {month.slice(0, 3)}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseMonthList;
