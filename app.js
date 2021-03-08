require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  uSureBro,
  showTasksToCheck,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveData");
const Tasks = require("./models/exercises");
const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const tareasDB = readDB();
  // si hay un archivo que leer , lo carga
  if (tareasDB) {
    tasks.loadTasks(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      // Crea una Tarea
      case "1":
        const desc = await readInput("Descripción:");
        tasks.newTask(desc);
        break;

      case "2":
        // Lista de las tareas
        tasks.taskList;
        break;
      case "3":
        // Solo pendientes
        tasks.tasksDone(false);
        break;
      case "4":
        // Solo completadas
        tasks.tasksDone(true);
        break;
      case "5":
        //Espera a que se muestren las tareas, cambia el valor de completado
        const ids = await showTasksToCheck(tasks.listadoArr);
        tasks.changeState(ids);
        break;
      case "6":
        // Espera a que se muestren las tareas , si 0 , sale del menu , si otro , muestra un aviso y la borra si Yes o cancela si No
        const id = await deleteTaskList(tasks.listadoArr);
        if (id !== "0") {
          const uSure = await uSureBro("Estas a punta de borrar una tarea");
          if (uSure) {
            tasks.deleteTask(id);
            console.log("Tarea borrada correctamente");
          }
        }
        break;
      case "0":
        // Sale de la app
        break;
    }
    // Guarda los cambios
    saveDB(tasks.listadoArr);
    // Mete una pausa para poder ver el menu , al pulsar enter , se continua la ejecución
    await pause();
  } while (opt != "0");
};

main();
