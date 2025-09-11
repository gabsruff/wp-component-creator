import { defineConfig } from "vite";
import crypto from "crypto";
import { readFile } from "fs/promises";

const raw = await readFile("./component.config.json", "utf-8");
const config = JSON.parse(raw);
const componentName = config.slug;

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.js",
      name: componentName,
      fileName: "bundle",
    },
    cssCodeSplit: false,
    outDir: "wp-plugin/assets", // destino directo dentro del plugin
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "iife", // para que funcione en WordPress sin imports
        entryFileNames: `${componentName}.js`,
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // convierte .my-class → styles.myClass
      generateScopedName: (name, filename) => {
        // hash corto de 4 chars basado en el nombre de la clase + archivo
        const hash = crypto
          .createHash("md5")
          .update(filename + name)
          .digest("base64")
          .replace(/[^a-zA-Z0-9]/g, "")
          .slice(0, 4);

        return `${componentName}-${name}-${hash}`;
      },
    },
    postcss: "./postcss.config.js", // Vite lo detecta, pero lo dejamos explícito
  },
});
