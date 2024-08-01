import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@src": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@enums": path.resolve(__dirname, "./src/enums"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@middlewares": path.resolve(__dirname, "./src/middlewares"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@repositories": path.resolve(__dirname, "./src/repositories"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
          "react-toastify": ["react-toastify"],
          "react-beautiful-dnd": ["react-beautiful-dnd"],
          "date-picker": ["react-datepicker"],
          slate: ["slate", "slate-history", "slate-react"],
          "styled-components": ["styled-components"],
          swiper: ["swiper"],
          axios: ["axios"],
          "js-cookie": ["js-cookie"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
