import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/public_api.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
