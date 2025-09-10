import dotenv from "dotenv";
dotenv.config();

/**
 * Verifica si las variables de entorno están definidas
 * @param {string[]} vars - Nombres de las variables a verificar
 * @returns {boolean} - true si todas existen, false si falta alguna
 */
export function checkEnv(vars) {
  const missing = vars.filter((v) => !process.env[v]);

  if (missing.length > 0) {
    console.log("❌ Faltan variables de entorno:");
    missing.forEach((v) => console.log(` - ${v}`));
    return false;
  } else {
    console.log("✅ Todas las variables de entorno están definidas.");
    return true;
  }
}
