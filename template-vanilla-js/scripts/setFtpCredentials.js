import { input, password, confirm } from "@inquirer/prompts";
import updateEnv from "./utils/updateEnv.js";
import { deployFtp } from "./deployFtp.js";

export async function setFtpCredentials() {
  const FTP_HOST = await input({
    message: "FTP Host:",
  });
  const FTP_USER = await input({
    message: "FTP User:",
  });
  const FTP_PASSWORD = await password({
    message: "FTP Password:",
  });
  const FTP_REMOTE_DIR = await input({
    message: "FTP Remote directory:",
  });

  const answers = {
    FTP_HOST: FTP_HOST,
    FTP_USER: FTP_USER,
    FTP_PASSWORD: FTP_PASSWORD,
    FTP_REMOTE_DIR: FTP_REMOTE_DIR,
  };

  updateEnv(answers);
  console.log("✅ Credentials saved in '.env");
  await setDeployNow();
}

async function setDeployNow() {
  const deploy = await confirm({
    message: "Do you want to deploy now?",
    default: false,
  });

  if (deploy === true) {
    console.log("Initializing deploy");
    await deployFtp();
  } else {
    console.log("You can deploy later using 'npm run deploy'");
  }
}
