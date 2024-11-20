import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  build: {
    outDir:
      "/Users/ldh/kbworkspace/kbworkspace/09_Vue+Spring/scoula/backend/src/main/webapp/resources",
    emptyOutDir: true, // 기존 결과물 덮어쓰기
  },
});
