export const capitalize = (val: string) =>
    `${val.charAt(0).toUpperCase()}${val.slice(1)}`;

export const formatCurrency = (value: string, currency: string) =>
    Intl.NumberFormat("en", { style: "currency", currency }).format(+value);

export const formatDate = (value: Date) => {
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        value
    );
    const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
        value
    );
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(value);

    return `${year}-${month}-${day}`;
};
