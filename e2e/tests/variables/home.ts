import { MONTHS } from "./auth";

const monthNum = 10;
const monthName = Object.keys(MONTHS)[monthNum - 1].toLowerCase();

const getMonthName = (num: number, type: "normal" | "short" = "normal") => {
    const name = Object.keys(MONTHS)[num - 1].toLowerCase();

    return type === "normal" ? name : name.slice(0, 3);
};

export const EXPENSE = {
    YEAR: 2025,
    MONTH: {
        NUM: monthNum,
        NAME: monthName,
        SHORT: monthName.slice(0, 3),
    },
    MONTHS: [
        {
            NUM: 11,
            NAME: getMonthName(11),
            SHORT: getMonthName(11, "short"),
        },
        {
            NUM: 12,
            NAME: getMonthName(12),
            SHORT: getMonthName(12, "short"),
        },
    ],
};
