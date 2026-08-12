import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages project sites are served from /<repo>/; the deploy workflow injects it.
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
});
