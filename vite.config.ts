import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const userOptions: Partial<VitePWAOptions> = {
    manifest: {
        name: "mdWrite",
        short_name: "mW",
        description: "A web-based markdown editor",
        categories: ["Development", "Education", "Office"],
        theme_color: "#ffffff",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
            {
                src: "/icons/favicon.ico",
                type: "icon",
                purpose: "any maskable",
            },
            {
                src: "/icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/icons/apple-touch-icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/icons/favicon-16x16.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/icons/favicon-32x32.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
    },
    registerType: "autoUpdate",
    injectRegister: "auto",
    workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png}"],
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), VitePWA(userOptions)],
    build: {
        outDir: "./build",
        sourcemap: true,
    },
    base: "https://shashotonur.github.io/mdwrite/",
});
