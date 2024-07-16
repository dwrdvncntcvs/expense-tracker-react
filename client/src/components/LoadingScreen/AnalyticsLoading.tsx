import { FC } from "react";

const AnalyticsLoading: FC = () => {
    return (
        <div className="w-full p-4 space-y-4 h-full">
            <div className="h-7 w-64 bg-light/20 rounded animate-pulse"></div>
            <div className="flex flex-col gap-4 items-center h-full justify-center">
                <div className="w-10 h-10 bg-light/20 animate-spin"></div>
                <p className="text-sm text-light animate-pulse">
                    Please wait, we're generating the analytics of your
                    expenses...
                </p>
            </div>
        </div>
    );
};

export default AnalyticsLoading;
