const { v4: uuid4 } = require("uuid");
// Tarea con número de identificación , descripción (cuerpo) y fecha (si null,0,undefined == false)
class Task {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuid4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports = Task;
