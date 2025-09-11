#!/usr/bin/env node
import { input } from "@inquirer/prompts";
import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  // 1. Preguntar al usuario
  const name = await input({
    message: "Nombre del componente:",
    default: "Mi componente",
  });
  const description = await input({
    message: "Descripción:",
    default: "Componente desarrollado con Vite",
  });
  const author = await input({ message: "Autor:", default: "Tu Nombre" });
  const slug = await input({
    message: "Slug (sin espacios):",
    default: "mi-componente",
  });

  const dir = await input({
    message: "Directorio destino:",
    default: "my-plugin",
  });

  // 2. Copiar archivos base (Node 16.7+ soporta fs.cp con recursive)
  const templateDir = path.join(__dirname, "template-vanilla-js");
  const targetDir = path.join(process.cwd(), dir);

  await fsp.cp(templateDir, targetDir, { recursive: true });

  // Procesar component.config.json
  const configPath = path.join(targetDir, "component.config.json");
  const configData = {
    name: name,
    description: description,
    author: author,
    slug: slug,
  };

  fsp.writeFile(configPath, JSON.stringify(configData, null, 2));
  console.log(
    "Config saved in 'component.config.json'. You can modify the config file or run the command 'npm run config' to update."
  );

  // 4. Mensaje final
  console.log(`✅ Proyecto creado en ${dir}`);
  console.log(`➡️  cd ${dir}`);
  console.log(`   npm install`);
  console.log(`   npm run dev`);
};

run();
