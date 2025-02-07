import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom"], // Agrega las dependencias que usa tu proyecto
  },
  test: {
    globals: true,         // Soporta métodos globales como describe, test, expect
    environment: 'jsdom',  // Para probar React (simula el DOM en Node.js)
    setupFiles: './setupTests.js', // Configuración adicional, como jest-dom
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   base: "/",
//   plugins: [react()],
//   preview: {
//     port: 8080,
//     strictPort: true,
//   },
//   server: {
//     port: 8080,
//     strictPort: true,
//     host: true,
//     origin: "http://0.0.0.0:8080",
//   },
// });
