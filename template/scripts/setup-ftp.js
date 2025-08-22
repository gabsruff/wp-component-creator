import inquirer from "inquirer";
import fs from "fs";

async function main() {
  const answers = await inquirer.prompt([
    { name: "host", message: "FTP Host:" },
    { name: "user", message: "FTP User:" },
    { type: "password", name: "password", message: "FTP Password:" },
    {
      name: "remoteDir",
      message: "Directorio remoto en",
    },
  ]);

  fs.writeFileSync("ftp-config.json", JSON.stringify(answers, null, 2));
  console.log("✅ Configuración guardada en ftp-config.json");
}

main();
