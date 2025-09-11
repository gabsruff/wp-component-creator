import { select } from "@inquirer/prompts";
import { setFtpCredentials } from "./setFtpCredentials.js";
import { updateConfig } from "./updateConfig.js";

async function configSelection(params) {
  const configChoice = await select({
    message: "Which config do you want to edit?",
    choices: [
      { name: "FTP Credentials.", value: "ftpCredentials" },
      {
        name: "Component metadata.",
        value: "componentMeta",
        description:
          "This is used during PHP file generation and once deployed it's displayed as plugin information in WordPress.",
      },
    ],
  });

  switch (configChoice) {
    case "ftpCredentials":
      await setFtpCredentials();
      break;
    case "componentMeta":
      await updateConfig();
      break;
    default:
      console.log("Unknown choice.");
      break;
  }
}

configSelection();
