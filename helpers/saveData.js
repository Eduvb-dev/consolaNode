const fs = require("fs");
const file = "./db/data.json";
// guarda en el archivo como json
const saveDB = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};
// si hay un archivo , lo lee
// si no , devuelve null , si intenta leerlo pero no puede devolver datos (por ejemplo , archivo vacio)
// devuelve null también
const readDB = () => {
  if (!fs.existsSync(file)) return null;
  try {
    const info = fs.readFileSync(file, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return data;
  } catch (error) {
    return null;
  }
};
module.exports = {
  saveDB,
  readDB,
};
