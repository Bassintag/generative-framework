import { defineConfig, InlineConfig } from "vite";
import { devDependencies } from "./package.json";

const entries = ["react", "react-dom", "@chriscourses/perlin-noise"];

const external = Object.keys(devDependencies).filter(
  (k) => !entries.includes(k)
);

export const config: Partial<InlineConfig> = {
  optimizeDeps: {
    entries,
    exclude: external,
  },
  build: {
    minify: "terser",
    outDir: "lib",
    sourcemap: true,
    rollupOptions: {
      external,
      treeshake: true,
    },
    lib: {
      name: "GenerativeFramework",
      entry: "src/index.ts",
      formats: ["cjs", "es"],
      fileName: (format) => `index.${format}.js`,
    },
    terserOptions: {
      compress: true,
      output: {
        comments: false,
        beautify: false,
      },
    },
  },
};

export default defineConfig(config);
