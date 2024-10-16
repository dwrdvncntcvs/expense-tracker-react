import { useState } from "react";
import { useAppDispatch } from "./storeHooks";
import { hide, show } from "@store/slices/modal";
import { useDownloadAllDataMutation } from "@store/queries/api";
import { exportData } from "@common/utils/export";
import { generateRandomId } from "@common/utils/str";

export type ExportMethod =
    | "all"
    | "expenses"
    | "monthly_expenses"
    | "categories"
    | "tags";

export type ImportBtn = {
    [key in ExportMethod]: () => Promise<void> | void;
};

export type IncludedItem = {
    [key in ExportMethod]: string[];
};

export default function useExportData() {
    const dispatch = useAppDispatch();

    const [downloadAllData] = useDownloadAllDataMutation();

    const [selectedExportMethod, setSelectedExportMethod] = useState<
        ExportMethod | ""
    >("");

    const handleSelectExportMethod = (data: ExportMethod) => {
        setSelectedExportMethod(data);
        dispatch(show("export"));
    };

    const unSelectExportMethod = () => {
        setSelectedExportMethod("");
    };

    const exportIncludedItems: IncludedItem = {
        all: [
            "User Information",
            "Expenses",
            "Monthly Expenses",
            "Categories",
            "Tags",
        ],
        expenses: ["Expenses", "Monthly Expenses", "Categories", "Tags"],
        monthly_expenses: ["Monthly Expenses", "Categories", "Tags"],
        categories: ["Categories"],
        tags: ["Tags"],
    };

    const downloadData = async () => {
        const id = generateRandomId().toLowerCase();
        const date = new Date().toISOString().split("T")[0];

        if (selectedExportMethod === "all") {
            const { data } = await downloadAllData();
            exportData(data, `${id}-${date}`);
        }

        dispatch(hide());
    };

    const exportBtns: Partial<ImportBtn> = {
        all: () => {
            handleSelectExportMethod("all");
        },
        // expenses: () => {
        //     handleSelectExportMethod("expenses");
        // },
        // monthly_expenses: () => {
        //     handleSelectExportMethod("monthly_expenses");
        // },
        // categories: () => {
        //     handleSelectExportMethod("categories");
        // },
        // tags: () => {
        //     handleSelectExportMethod("tags");
        // },
    };

    return {
        unSelectMethod: unSelectExportMethod,
        exportMethod: selectedExportMethod,
        includedItems: exportIncludedItems,
        exportDataFn: downloadData,
        buttons: exportBtns,
    };
}
