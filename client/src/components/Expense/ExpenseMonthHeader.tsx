import { ActionButtonOptions } from "@_types/components/button";
import { appConfig } from "@common/constants";
import ActionButtons from "@components/ActionButtons";
import { FC } from "react";
import { HiArrowDownTray, HiArrowTrendingUp } from "react-icons/hi2";

interface ExpenseMonthHeaderProps {
    year: string;
}

const ExpenseMonthHeader: FC<ExpenseMonthHeaderProps> = ({ year }) => {
    const analyticOptions: ActionButtonOptions[] = appConfig.analytics
        ? [
              {
                  type: "button",
                  bgColor: "secondary",
                  color: "plain",
                  icon: HiArrowTrendingUp,
                  onClick: () => {
                      console.log("Analytics");
                  },
              },
          ]
        : [];
        
    const importOptions: ActionButtonOptions[] = appConfig.imports
        ? [
              {
                  type: "button",
                  bgColor: "secondary",
                  color: "plain",
                  icon: HiArrowDownTray,
                  onClick: () => {
                      console.log("Export");
                  },
              },
          ]
        : [];

    return (
        <div className="h-14 flex justify-between items-center text-2xl px-6 font-bold text-primary">
            <h2 className="text-3xl">{year}</h2>
            <ActionButtons
                className="p-2"
                rounded="full"
                options={[...analyticOptions, ...importOptions]}
            />
        </div>
    );
};

export default ExpenseMonthHeader;
