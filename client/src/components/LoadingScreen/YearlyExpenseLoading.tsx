import { MONTHS } from "@common/constants";
import ActionButtons from "@components/ActionButtons";
import { FC } from "react";

const YearlyExpenseLoader: FC = () => {
    return (
        <div className="flex flex-col gap-5 ">
            <div className="h-14 flex justify-between items-center text-2xl px-6 font-bold text-primary">
                <h2 className="text-3xl w-60 h-9 rounded bg-light/20 animate-pulse"></h2>
                <ActionButtons
                    className="p-2 h-10 w-10 flex justify-center items-center animate-pulse"
                    rounded="full"
                    options={[
                        {
                            disabled: true,
                            bgColor: "light",
                            type: "button",
                            color: "light",
                        },
                        {
                            disabled: true,
                            bgColor: "light",
                            type: "button",
                            color: "light",
                        },
                    ]}
                />
            </div>
            <div className="flex items-center justify-center gap-2">
                {Object.keys(MONTHS).map((month: string) => (
                    <div
                        key={month}
                        className="uppercase rounded-full bg-light/20 text-white text-xl w-20 h-20 flex items-center justify-center animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default YearlyExpenseLoader;
