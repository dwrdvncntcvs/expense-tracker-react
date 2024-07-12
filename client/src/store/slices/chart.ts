import { useAppSelector } from "@hooks/storeHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChartType = "bar" | "pie";

export interface ChartState {
    chart: ChartType;
}

const initialState: ChartState = {
    chart: "bar",
};

const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        changeChart: (state, actions: PayloadAction<ChartType>) => {
            state.chart = actions.payload;
        },
        resetChart: (state) => {
            state.chart = "bar";
        },
    },
});

export const useChart = () => {
    return useAppSelector((state) => state.chartReducer);
};

export const { changeChart, resetChart } = chartSlice.actions;

export default chartSlice.reducer;
