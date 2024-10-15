import dotenv from "dotenv";
import path from "path";

const ENV = (process.env.NODE_ENV || "dev").trim();

dotenv.config({
    path: path.resolve(__dirname, `../.env.${ENV}`),
});

const PORT = +(process.env.PORT || 3000);
const SECRET_KEY = process.env.SECRET_KEY as string;
const MONGO_URL = process.env.MONGO_URL as string;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

const FIREBASE_VARS = {
    API_KEY: process.env.F_API_KEY,
    AUTH_DOMAIN: process.env.F_AUTH_DOMAIN,
    DATABASE_URL: process.env.F_DATABASE_URL,
    PROJECT_ID: process.env.F_PROJECT_ID,
    STORAGE_BUCKET: process.env.F_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.F_MESSAGING_SENDER_ID,
    APP_ID: process.env.F_APP_ID,
};

const IS_PROD = ENV === "prod" || ENV === "production";

type MONTH_TYPE =
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";

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
};

const MONTHS = Object.keys(MONTHS_OBJ).map(
    (key) => MONTHS_OBJ[key as MONTH_TYPE]
);

const EXPENSE_TYPE = [
    "needs",
    "entertainments",
    "purchases",
    "savings",
    "transportation",
    "hobby",
];

export {
    PORT,
    SECRET_KEY,
    MONGO_URL,
    MONTHS,
    EXPENSE_TYPE,
    FIREBASE_VARS,
    ENV,
    ALLOWED_ORIGINS,
    IS_PROD,
};
