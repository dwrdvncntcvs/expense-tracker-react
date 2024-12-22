export type ExpenseReportByYearMeta = {
    totalAmount: number;
    year: number;
};

export type ExpenseReportByYearData = {
    id: number;
    totalAmount: number;
    label: string;
    percentage: number;
};

export type ExpenseReportByCategoryMeta = {
    totalAmount: number;
};

export type ExpenseReportByCategoryMonthly = {
    month: number;
    totalAmount: number;
    count: number;
};

export type ExpenseReportByCategoryData = {
    categoryName: string;
    id: string;
    months: ExpenseReportByCategoryMonthly;
};

export type ExpenseReportByMonthData = {
    id: number;
    totalAmount: number;
    label: string;
    percentage: number;
};

export type ExpenseReportByMonthMeta = {
    totalAmount: number;
    count: number;
};

export type ExpenseReportByMonth = {
    meta: ExpenseReportByMonthMeta;
    data: ExpenseReportByMonthData[];
};

export type ExpenseReportByYear = {
    meta: ExpenseReportByYearMeta;
    data: ExpenseReportByYearData[];
};

export type ExpenseReportByCategory = {
    meta: ExpenseReportByCategoryMeta;
    data: ExpenseReportByCategoryData[];
};
