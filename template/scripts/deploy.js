import fs from "fs";
import ftp from "basic-ftp";
import { join } from "path";
import { readdir } from "fs/promises";

async function main() {
  if (!fs.existsSync("ftp-config.json")) {
    console.log(
      "❌ No se encontró ftp-config.json. Corre primero: node setup-ftp.js"
    );
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync("ftp-config.json", "utf-8"));
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false,
    });

    console.log("Subiendo plugin...");
    await client.ensureDir(`${config.remoteDir}`);
    await client.clearWorkingDir();
    await uploadDir(client, process.cwd());

    console.log("✅ Deploy completado");
  } catch (err) {
    console.error("❌ Error:", err);
  }
  client.close();
}

// Función recursiva para subir directorios
async function uploadDir(client, dir) {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      await client.ensureDir(file.name);
      await client.cd(file.name);
      await uploadDir(client, path);
      await client.cdup();
    } else {
      await client.uploadFrom(path, file.name);
    }
  }
}

main();
