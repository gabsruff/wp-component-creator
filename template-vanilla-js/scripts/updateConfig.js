import { input } from "@inquirer/prompts";
import fs from "fs";
import { promises as fsp } from "fs";

const currentConfig = JSON.parse(
  fs.readFileSync("component.config.json", "utf-8")
);

export const updateConfig = async () => {
  const name = await input({
    message: "Component's Name:",
    default: currentConfig.name,
  });
  const description = await input({
    message: "Description:",
    default: currentConfig.description,
  });
  const author = await input({
    message: "Author:",
    default: currentConfig.author,
  });
  const slug = await input({
    message: "Slug (no-spaces):",
    default: currentConfig.slug,
  });

  const newConfig = {
    name: name,
    description: description,
    author: author,
    slug: slug,
  };

  console.log(newConfig);

  fsp.writeFile("component.config.json", JSON.stringify(newConfig, null, 2));
  console.log(
    "Config saved in 'component.config.json'. You can modify the config file or run the command 'npm run config' to update."
  );
};
