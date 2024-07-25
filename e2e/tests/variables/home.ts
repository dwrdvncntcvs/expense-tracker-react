import { MONTHS } from "./auth";

const monthNum = 10;
const monthName = Object.keys(MONTHS)[monthNum - 1].toLowerCase();

export const EXPENSE = {
    YEAR: 2025,
    MONTH: {
        NUM: monthNum,
        NAME: monthName,
        SHORT: monthName.slice(0, 3),
    },
};
