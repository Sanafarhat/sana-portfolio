import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// This file runs under Node, but the template ships no @types/node (nothing
// outside the offline pnpm store can be installed). Declare the one global
// it reads so `tsc -b` type-checks it without the package.
declare const process: { env: Record<string, string | undefined> };

// The backend port is read from the environment at dev-server start — it is
// deliberately NOT baked into this file, so clones/forks of this project can
// run side-by-side on their own ports (pass BACKEND_PORT when launching).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT ?? "8000"}`,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
