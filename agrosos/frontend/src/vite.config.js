import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // Soporta métodos globales como describe, test, expect
    environment: 'jsdom',  // Para probar React (simula el DOM en Node.js)
    setupFiles: './setupTests.js', // Configuración adicional, como jest-dom
  },
});

