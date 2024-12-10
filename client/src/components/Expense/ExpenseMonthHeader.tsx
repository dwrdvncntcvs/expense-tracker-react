import { ActionButtonOptions } from "@_types/components/button";
import { appConfig } from "@common/constants";
import ActionButtons from "@components/ActionButtons";
import { FC } from "react";
import { HiArrowDownTray, HiArrowTrendingUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface ExpenseMonthHeaderProps {
    year: string;
}

const ExpenseMonthHeader: FC<ExpenseMonthHeaderProps> = ({ year }) => {
    const navigate = useNavigate();

    const analyticOptions: ActionButtonOptions[] = appConfig.analytics
        ? [
              {
                  type: "button",
                  bgColor: "secondary",
                  color: "plain",
                  icon: HiArrowTrendingUp,
                  onClick: () => {
                      navigate(`/${year}/analytics`);
                  },
                  id: `${year}-analytics`,
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
                  id: `${year}-exports`,
              },
          ]
        : [];

    return (
        <div className="md:h-14 flex justify-between items-center text-2xl px-6 font-bold text-primary">
            <h2 className="md:text-3xl text-xl" id={year}>
                {year}
            </h2>
            <ActionButtons
                className="p-2 md:h-10 md:w-10 w-8 h-8 flex justify-center items-center"
                rounded="full"
                options={[...analyticOptions, ...importOptions]}
            />
        </div>
    );
};

export default ExpenseMonthHeader;
