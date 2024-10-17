export type ExportMethod =
    | "all"
    | "expenses"
    | "yearly_expenses"
    | "monthly_expenses"
    | "categories"
    | "tags";

export type ImportBtn = {
    [key in ExportMethod]: () => Promise<void> | void;
};

export type IncludedItem = {
    [key in ExportMethod]: string[];
};
