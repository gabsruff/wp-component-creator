import { checkEnv } from "./utils/checkEnv.js";
import { setFtpCredentials } from "./setFtpCredentials.js";
import { deployFtp } from "./deployFtp.js";

const reqCredentials = [
  "FTP_HOST",
  "FTP_USER",
  "FTP_PASSWORD",
  "FTP_REMOTE_DIR",
];

if (!checkEnv(reqCredentials)) {
  console.log("Missing credentials");
  await setFtpCredentials(); // puede pedir datos al usuario y actualizar .env
} else {
  console.log("Credentials found, attempting to deploy");
  await deployFtp();
}
