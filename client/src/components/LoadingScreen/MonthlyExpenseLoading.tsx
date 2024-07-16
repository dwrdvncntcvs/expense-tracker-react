import ActionButtons from "@components/ActionButtons";
import Button from "@components/Button";
import { FC } from "react";

const MonthlyExpenseLoading: FC = () => {
    const cards = [1, 2, 3, 4];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between h-10">
                <div className="flex gap-3">
                    <Button
                        rounded="full"
                        bgColor="light"
                        color="light"
                        className="h-10 w-10"
                        disabled
                    />
                    <h2 className="h-10 w-64 rounded bg-light/20"></h2>
                </div>
                <div className="flex items-center gap-4">
                    <p className="h-7 w-48 rounded bg-light/20"></p>
                    <ActionButtons
                        className="w-10 h-10"
                        rounded="full"
                        options={[
                            {
                                type: "button",
                                disabled: true,
                                bgColor: "light",
                                color: "light",
                            },
                            {
                                type: "button",
                                disabled: true,
                                bgColor: "light",
                                color: "light",
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                {cards?.map((num) => {
                    return (
                        <div
                            key={num}
                            className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 p-2"
                        >
                            <div className="h-full shadow-md rounded-lg flex flex-col gap-2 border-light/20 border-2 relative overflow-auto p-2">
                                <h3 className="text-2xl font-semibold text-primary text-start h-7 bg-light/20 rounded"></h3>
                                <div className="space-y-1">
                                    <p className="line-clamp-4 text-xs bg-light/20 h-4 rounded"></p>
                                    <p className="line-clamp-4 text-xs bg-light/20 h-4 w-28 rounded"></p>
                                </div>
                                <div className="flex gap-4 justify-between items-end mt-5">
                                    <p className="italic text-sm text-gray-600 w-16 h-5 bg-light/20 rounded"></p>
                                    <div className="flex flex-col items-end gap-2">
                                        <p className="text-lg  font-semibold h-11 w-40 rounded bg-light/20"></p>
                                        <p className="italic text-sm text-gray-600 h-5 rounded w-32 bg-light/20"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlyExpenseLoading;
