export const capitalize = (val: string) =>
    `${val.charAt(0).toUpperCase()}${val.slice(1)}`;

export const formatCurrency = (value: string, currency: string) =>
    Intl.NumberFormat("en", { style: "currency", currency }).format(value);
