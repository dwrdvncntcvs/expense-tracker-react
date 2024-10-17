import { useState } from "react";
import { useAppDispatch } from "./storeHooks";
import { hide, show } from "@store/slices/modal";
import { useDownloadDataMutation } from "@store/queries/api";
import { exportData } from "@common/utils/export";
import { ExportMethod, ImportBtn, IncludedItem } from "@_types/export";

export default function useExportData() {
    const dispatch = useAppDispatch();

    const [downloadDataMt] = useDownloadDataMutation();

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
        yearly_expenses: ["Expenses", "Monthly Expenses", "Categories", "Tags"],
        monthly_expenses: ["Monthly Expenses", "Categories", "Tags"],
        categories: ["Categories"],
        tags: ["Tags"],
    };

    const downloadData = async () => {
        if (selectedExportMethod === "") return;
        try {
            const { data } = await downloadDataMt({
                method_type: selectedExportMethod,
            });
            const date = data.date_exported.split("T")[0];

            exportData(data, `${data.export_id}-${date}`);
        } catch (e) {
            console.log(e);
        } finally {
            unSelectExportMethod();
            dispatch(hide());
        }
    };

    const exportBtns: Partial<ImportBtn> = {
        all: () => {
            handleSelectExportMethod("all");
        },
        expenses: () => {
            handleSelectExportMethod("expenses");
        },
        yearly_expenses: () => {
            handleSelectExportMethod("yearly_expenses");
        },
        monthly_expenses: () => {
            handleSelectExportMethod("monthly_expenses");
        },
        categories: () => {
            handleSelectExportMethod("categories");
        },
        tags: () => {
            handleSelectExportMethod("tags");
        },
    };

    return {
        unSelectMethod: unSelectExportMethod,
        exportMethod: selectedExportMethod,
        includedItems: exportIncludedItems,
        exportDataFn: downloadData,
        buttons: exportBtns,
    };
}
