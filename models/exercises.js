require("colors");
const Task = require("./exercise");
class Tasks {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  // Lista de tareas , getter, array de objetos
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const task = this._listado[key];
      listado.push(task);
    });
    return listado;
  }
  // Carga las tareas
  loadTasks(arr = []) {
    arr.forEach((task) => {
      this._listado[task.id] = task;
    });
  }
  // Crea una nueva tarea
  newTask(desc = "") {
    const task = new Task(desc);
    this._listado[task.id] = task;
  }
  // Convierte la lista de tareas en (array de objetos) en un objeto y de este muestra la tarea
  get taskList() {
    this.listadoArr.forEach((arr, i) => {
      const index = i + 1;
      const { desc, completadoEn } = arr;
      let text = "";
      completadoEn ? (text = "Completada".green) : (text = "Pendiente".red);
      console.log(`${String(index + ".").green} ${desc} :: ${text}`);
    });
  }

  // Si la tarea esta hecha (valor positivo en completadoEn) la inprime de una forma si no lo esta (valor negativo)
  // lo pasa como no completado
  tasksDone(done = true) {
    let index = 0;
    this.listadoArr.forEach((arr, i) => {
      const { desc, completadoEn } = arr;
      let text = "";
      completadoEn ? (text = "Completada".green) : (text = "Pendiente".red);
      if (done == true && completadoEn) {
        index++;
        console.log(
          `${String(index + ".").green} ${desc} :: ${text} en ${
            String(completadoEn).blue
          }`
        );
      } else if (done == false && completadoEn == null) {
        index++;
        console.log(`${String(index + ".").green} ${desc} :: ${text}`);
      }
    });
  }
  // Borra tarea
  deleteTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  // Cambia una tarea a completada y le pone fecha ||
  // Pone una tarea sin completar
  changeState(ids = []) {
    ids.forEach((id) => {
      const task = this._listado[id];
      if (!task.completadoEn) {
        task.completadoEn = new Date().toDateString();
      }
    });

    this.listadoArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listado[task.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tasks;
