#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  // 1. Preguntar al usuario
  const answers = await inquirer.prompt([
    {
      name: "pluginName",
      message: "Nombre del componente:",
      default: "Mi componente",
    },
    {
      name: "pluginDescription",
      message: "Descripción:",
      default: "Componente desarrollado con Vite",
    },
    { name: "author", message: "Autor:", default: "Tu Nombre" },
    { name: "slug", message: "Slug (sin espacios):", default: "mi-componente" },
    { name: "dir", message: "Directorio destino:", default: "my-plugin" },
  ]);

  // 2. Copiar archivos base
  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), answers.dir);
  fs.copySync(templateDir, targetDir);

  // 3. Procesar plugin.php.tpl
  const pluginTpl = fs.readFileSync(
    path.join(templateDir, "wp-plugin/plugin.php.tpl"),
    "utf-8"
  );
  const pluginContent = pluginTpl
    .replace(/<%= pluginName %>/g, answers.pluginName)
    .replace(/<%= pluginDescription %>/g, answers.pluginDescription)
    .replace(/<%= author %>/g, answers.author)
    .replace(/<%= slug %>/g, answers.slug);

  const pluginPhpPath = path.join(targetDir, `wp-plugin/${answers.slug}.php`);
  fs.writeFileSync(pluginPhpPath, pluginContent, "utf-8");
  const pluginTplTempPath = path.join(targetDir, "wp-plugin/plugin.php.tpl");
  fs.removeSync(pluginTplTempPath);

  // 4. Mensaje final
  console.log(`✅ Proyecto creado en ${answers.dir}`);
  console.log(`➡️  cd ${answers.dir}`);
  console.log(`   npm install`);
  console.log(`   npm run dev`);
};

run();
