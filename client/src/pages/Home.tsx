import { useGetExpensesQuery } from "@store/queries/expense";
import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
    const { data, isLoading } = useGetExpensesQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-5">
            {Object.keys(data.months).map((key) => (
                <div key={key} className="space-y-3">
                    <div className="h-10 flex items-center text-2xl px-6 font-bold text-primary">
                        <h2>{key}</h2>
                    </div>
                    <div className="flex gap-2">
                        {data.months[key].map((month: string) => (
                            <Link
                                to={`/${month}/${key}`}
                                key={month}
                                className="uppercase rounded-full bg-tertiary text-white text-xl w-20 h-20 flex items-center justify-center"
                            >
                                {month.slice(0, 3)}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
