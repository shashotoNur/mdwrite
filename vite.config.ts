import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const inProduction = true;

const name = "mdwrite";
const origin = "shashotonur.github.io";
const baseURL = inProduction
    ? `https://${origin}/${name}/`
    : `http://localhost:3000/${name}/`;

const userOptions: Partial<VitePWAOptions> = {
    manifest: {
        id: baseURL,
        name,
        short_name: name,
        description: "A web-based markdown editor",
        start_url: baseURL,
        scope: baseURL,
        launch_handler: { client_mode: "auto" },
        categories: ["Development", "Education", "Office"],
        orientation: "portrait",
        theme_color: "#0D1117",
        display: "standalone",
        dir: "ltr",
        scope_extensions: [{ origin }],
        screenshots: [
            {
                src: baseURL + "preview/app_home.webp",
                sizes: "1366x1379",
                form_factor: "wide",
                type: "image/webp",
            },
            {
                src: baseURL + "preview/app_main.webp",
                sizes: "1366x1152",
                form_factor: "wide",
                type: "image/webp",
            },
        ],
        icons: [
            {
                src: baseURL + "icons/favicon.ico",
                sizes: "64x64 32x32 24x24 16x16",
                type: "icon",
                purpose: "maskable",
            },
            {
                src: baseURL + "icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: baseURL + "icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: baseURL + "icons/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "monochrome",
            },
            {
                src: baseURL + "icons/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
                purpose: "any",
            },
            {
                src: baseURL + "icons/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
                purpose: "any",
            },
        ],
    },
    registerType: "autoUpdate",
    injectRegister: "auto",
    workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,webp,txt,webmanifest}"],
    },
};

export default defineConfig({
    plugins: [react(), tsconfigPaths(), VitePWA(userOptions)],
    build: {
        outDir: "./build",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    ace: ["react-ace"],
                    plugins: ["react-markdown", "rehype-raw", "remark-emoji"],
                },
            },
        },
    },
    base: baseURL,
});
