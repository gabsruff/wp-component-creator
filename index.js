#!/usr/bin/env node
import inquirer from "inquirer";
import { promises as fsp } from "fs";
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

  // 2. Copiar archivos base (Node 16.7+ soporta fs.cp con recursive)
  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), answers.dir);

  await fsp.cp(templateDir, targetDir, { recursive: true });

  // 3. Procesar plugin.php.tpl
  const pluginTpl = await fsp.readFile(
    path.join(templateDir, "wp-plugin/plugin.php.tpl"),
    "utf-8"
  );

  const pluginContent = pluginTpl
    .replace(/<%= componentName %>/g, answers.pluginName)
    .replace(/<%= componentDescription %>/g, answers.pluginDescription)
    .replace(/<%= author %>/g, answers.author)
    .replace(/<%= slug %>/g, answers.slug);

  const pluginPhpPath = path.join(targetDir, `wp-plugin/${answers.slug}.php`);
  await fsp.writeFile(pluginPhpPath, pluginContent, "utf-8");

  const pluginTplTempPath = path.join(targetDir, "wp-plugin/plugin.php.tpl");
  await fsp.rm(pluginTplTempPath, { force: true });

  // Procesar config.env.tpl
  const configTpl = await fsp.readFile(
    path.join(templateDir, ".env.tpl"),
    "utf-8"
  );

  const configContent = configTpl
    .replace(/<%= componentName %>/g, answers.pluginName)
    .replace(/<%= componentDescription %>/g, answers.pluginDescription)
    .replace(/<%= author %>/g, answers.author)
    .replace(/<%= slug %>/g, answers.slug);

  const configEnvPath = path.join(targetDir, `.env`);
  await fsp.writeFile(configEnvPath, configContent, "utf-8");

  const configTplTempPath = path.join(targetDir, ".env.tpl");
  await fsp.rm(configTplTempPath, { force: true });

  // 4. Mensaje final
  console.log(`✅ Proyecto creado en ${answers.dir}`);
  console.log(`➡️  cd ${answers.dir}`);
  console.log(`   npm install`);
  console.log(`   npm run dev`);
};

run();
