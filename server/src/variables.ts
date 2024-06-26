require("dotenv").config();

const PORT = +(process.env.PORT || 3000);
const SECRET_KEY = process.env.SECRET_KEY as string;
const MONGO_URL = process.env.MONGO_URL as string;

type MONTH_TYPE = "JANUARY" |
    "FEBRUARY" |
    "MARCH" |
    "APRIL" |
    "MAY" |
    "JUNE" |
    "JULY" |
    "AUGUST" |
    "SEPTEMBER" |
    "OCTOBER" |
    "NOVEMBER" |
    "DECEMBER"

export const MONTHS_OBJ = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
}

const MONTHS = Object.keys(MONTHS_OBJ).map(key => MONTHS_OBJ[key as MONTH_TYPE])

const EXPENSE_TYPE = [
    "needs",
    "entertainments",
    "purchases",
    "savings",
    "transportation",
    "hobby",
];

export { PORT, SECRET_KEY, MONGO_URL, MONTHS, EXPENSE_TYPE };
