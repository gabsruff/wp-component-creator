import fs from "fs";
import { promises as fsp } from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(fs.readFileSync("component.config.json", "utf-8"));
const outDir = join(__dirname, "..", "wp-plugin");

const buildPHP = async () => {
  const phpTpl = await fsp.readFile(
    path.join(__dirname, "templates/plugin.php.tpl"),
    "utf-8"
  );

  const phpContent = phpTpl
    .replace(/<%= componentName %>/g, config.name)
    .replace(/<%= componentDescription %>/g, config.description)
    .replace(/<%= author %>/g, config.author)
    .replace(/<%= slug %>/g, config.slug);

  console.log("Cleaning directory: 'wp-plugin'");
  await fsp.rm(outDir, { recursive: true, force: true });
  await fsp.mkdir(outDir, { recursive: true });
  console.log("Ready.");

  console.log(`Regenerating PHP: '${config.slug}.php'`);
  const phpConfigfile = join(outDir, `${config.slug}.php`);
  await fsp.writeFile(phpConfigfile, phpContent, "utf-8");
  console.log(`Ready.`);
  console.log(`Executing 'vite build'.`);
};

buildPHP();
