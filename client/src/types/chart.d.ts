export interface BarChartData {
    id: string | number;
    label: string;
    percentage?: number;
    totalAmount: string | number;
}

export interface PieChartData {
    id: string | number;
    value: number;
    label: string;
    percentage: number;
    totalAmount: string | number;
}
