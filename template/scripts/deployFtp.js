import ftp from "basic-ftp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const wpPluginPath = join(__dirname, "..", "wp-plugin");

export async function deployFtp() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    console.log("Subiendo plugin...");
    await client.ensureDir(`${process.env.FTP_REMOTE_DIR}`);
    await client.clearWorkingDir();
    await client.uploadFromDir(wpPluginPath);

    console.log("✅ Successfull eploy");
  } catch (err) {
    console.error("DeployFtp.js ❌ Error:", err);
  }
  client.close();
}
