/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary:"var(--tertiary)",
                quaternary: "var(--quaternary)",
                light: "var(--light)",
                success: "var(--success)",
                warning: "var(--warning)",
                failure:"var(--failure)",
                plain: "var(--plain)",
            },
        },
    },
    plugins: [],
};
