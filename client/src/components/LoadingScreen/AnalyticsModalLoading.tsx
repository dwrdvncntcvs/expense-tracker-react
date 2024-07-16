import ActionButtons from "@components/ActionButtons";
import { FC } from "react";

const AnalyticsModalLoading: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <ActionButtons
                        className="h-10 w-10 animate-pulse"
                        rounded="full"
                        options={[
                            {
                                type: "button",
                                bgColor: "light",
                                color: "light",
                                disabled: true,
                            },
                            {
                                type: "button",
                                bgColor: "light",
                                color: "light",
                                disabled: true,
                            },
                        ]}
                    />
                </div>
                <h1 className="text-sm text-gray-500 text-end h-7 w-48 bg-light/20 rounded animate-pulse">
                    <span className="text-lg text-primary font-semibold"></span>
                </h1>
            </div>
            <div className="flex items-center justify-center w-full h-28">
                <div className="w-10 h-10 rounded-full bg-light/20 animate-ping"></div>
            </div>
        </div>
    );
};

export default AnalyticsModalLoading;
