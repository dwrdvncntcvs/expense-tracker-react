import { FC } from "react";
import { HiTrendingUp } from "react-icons/hi";

const NoExpenseYear: FC = () => {
    return <div className="flex flex-1 flex-col justify-center items-center h-full gap-4 p-5">
        <div className="flex items-center md:text-5xl text-xl text-primary font-bold transition-all">
            <p>Expenses Analytics</p>
            <HiTrendingUp className="text-primary md:w-12 md:h-12 w-7 h-7" />
        </div>
        <div className="text-center text-light italic md:text-base text-sm transition-all">
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
}

export default NoExpenseYear