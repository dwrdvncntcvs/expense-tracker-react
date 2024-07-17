import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": resolve(root, "components"),
            "@api": resolve(root, "common/api"),
            "@requests": resolve(root, "common/api/requests"),
            "@hooks": resolve(root, "hooks"),
            "@layouts": resolve(root, "layouts"),
            "@pages": resolve(root, "pages"),
            "@store": resolve(root, "store"),
            "@_types": resolve(root, "types"),
            "@common": resolve(root, "common"),
            "@validation": resolve(root, "validation"),
        },
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },
});
