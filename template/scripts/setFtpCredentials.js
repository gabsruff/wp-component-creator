import inquirer from "inquirer";
import updateEnv from "./utils/updateEnv.js";
import { deployFtp } from "./deployFtp.js";

export async function setFtpCredentials() {
  const answers = await inquirer.prompt([
    { name: "FTP_HOST", message: "FTP Host:" },
    { name: "FTP_USER", message: "FTP User:" },
    { type: "password", name: "FTP_PASSWORD", message: "FTP Password:" },
    {
      name: "FTP_REMOTE_DIR",
      message: "Directorio remoto en",
    },
  ]);

  updateEnv(answers);
  console.log("✅ Configuración guardada en ftp-config.json");
  await setDeployNow();
}

async function setDeployNow() {
  const confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "result",
      message: "Do you want to deploy now?",
      default: false,
    },
  ]);

  if (confirm.result === true) {
    console.log("Initializing deploy");
    await deployFtp();
  } else {
    console.log("You can deploy later using 'npm run deploy'");
  }
}
