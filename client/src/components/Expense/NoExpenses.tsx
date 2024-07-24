import { useSettings } from "@store/slices/settings";
import { FC } from "react";
import { HiCog8Tooth, HiTag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const NoExpenses: FC = () => {
    const { categories } = useSettings();

    return (
        <div className="flex flex-col h-full justify-center items-center gap-4">
            <h2 className="text-5xl font-bold text-primary">
                No Expenses Found!
            </h2>
            <div className="flex flex-col justify-center items-center text-gray-600">
                {categories.length < 1 ? (
                    <>
                        <p>
                            It looks like you haven't added a{" "}
                            <span className="font-bold text-primary">
                                Category
                            </span>{" "}
                            for your expenses yet!
                        </p>
                        <p>
                            Add a category first before you can create expenses
                        </p>
                        <Link
                            id="settings-category"
                            to="/settings/categories"
                            className="flex gap-4 items-center text-primary p-2 px-4 mt-4  hover:text-plain hover:bg-primary transition-all rounded-xl"
                        >
                            <HiCog8Tooth size={20} />
                            <span>/</span>
                            <span className="flex items-center gap-2 text-sm">
                                <HiTag size={20} />
                                Categories
                            </span>
                        </Link>
                    </>
                ) : (
                    <>
                        <p>It looks like you haven't added any expenses yet.</p>
                        <p>
                            Start by clicking the
                            <span className="font-bold text-primary">
                                "Add Expense"
                            </span>{" "}
                            button to keep track of your spending.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoExpenses;
