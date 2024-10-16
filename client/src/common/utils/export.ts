export const exportData = <T extends object>(data: T, name?: string) => {
    const blob = new Blob([JSON.stringify(data, null, 4)], {
        type: "application/json",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `export${name ? `-${name}` : ""}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};
