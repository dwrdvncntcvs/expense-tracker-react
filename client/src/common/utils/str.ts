export const capitalize = (val: string, separator = " ", joiner = " ") =>
    val
        .split(separator)
        .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
        .join(joiner);

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

export const abbreviate = (val: string, numberOfChar?: number) => {
    const str = val
        .split(" ")
        .map((val) => val.charAt(0).toUpperCase())
        .join("");

    if (numberOfChar) {
        return str.slice(0, numberOfChar);
    }

    return str;
};

export const generateRandomId = (length: number = 10) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
};
