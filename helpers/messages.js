require("colors");
const readline = require("readline");

const onMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=================".red);
    console.log("Choose one option".yellow);
    console.log("=================\n".red);

    console.log(`1. Crear tarea`);
    console.log(`2. Lista de tareas`);
    console.log(`3. Lista de tareas completadas`);
    console.log(`4. Lista de tareas pendientes`);
    console.log(`5. Completar tarea/s`);
    console.log(`6. Borrar tarea`);
    console.log(`0. Salir\n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Seleccione una opción: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`Presiona ${"Enter".blue} para continuar `, (answer) => {
      rl.close();
      resolve();
    });
  });
};
module.exports = {
  onMenu,
  pause,
};
