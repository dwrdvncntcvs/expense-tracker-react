import { FC } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";

const NoMonthlyExpense: FC = () => {
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-4">
            <HiOutlineFunnel size={50} className="text-primary" />
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
};

export default NoMonthlyExpense;
