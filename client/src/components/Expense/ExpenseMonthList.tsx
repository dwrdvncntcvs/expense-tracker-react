import { FC } from "react";
import { Link } from "react-router-dom";

interface ExpenseMonthListProps {
    data: string[];
    year: string;
}

export const ExpenseMonthList: FC<ExpenseMonthListProps> = ({ data, year }) => {
    return (
        <ul
            className="month-list flex flex-wrap items-center justify-center gap-2"
            id={year}
        >
            {data.map((month: string) => (
                <li key={month} className="month-item">
                    <Link
                        to={`/${month}/${year}`}
                        id={`${month}-${year}`}
                        className="uppercase rounded-full bg-tertiary text-white md:text-xl text-sm md:w-20 md:h-20 w-14 h-14 flex items-center justify-center hover:bg-secondary transition-all"
                    >
                        {month.slice(0, 3)}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseMonthList;
