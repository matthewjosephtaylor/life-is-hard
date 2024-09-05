import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist-overlay",
    // sourcemap: true,
    commonjsOptions: {},
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    // minify: "terser",
    // minify: true,
    // terserOptions: {
    //   mangle: false,
    // },
  },

  base: "",

  plugins: [react()],
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
    __APP_VERSION__: JSON.stringify("0.02 (alpha)"),
  },
});
