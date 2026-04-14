import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "login.html"),
                main: resolve(__dirname, "main.html"),
                account: resolve(__dirname, "account.html"),
                map: resolve(__dirname, "map.html"),
                event_form: resolve(__dirname, "event_form.html")
            }
        }
    }
});