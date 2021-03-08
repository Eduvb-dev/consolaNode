const inquirer = require("inquirer");

require("colors");

const questionsMenu = [
  {
    type: "list",
    name: "option",
    message: "Selecciona una opción".blue,
    //choices: ["opt1", "opt2", "opt3"],
    choices: [
      {
        value: "1",
        name: `${"1.".blue} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".blue} Lista de Tareas`,
      },
      {
        value: "3",
        name: `${"3.".blue} Lista de Tareas Pendientes`,
      },
      {
        value: "4",
        name: `${"4.".blue} Lista de Tareas Completadas`,
      },
      {
        value: "5",
        name: `${"5.".blue} Completar Tarea/s`,
      },
      {
        value: "6",
        name: `${"6.".blue} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".blue} Salir del programa`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===================================".red);
  console.log(`         Lista de Tareas`.yellow);
  console.log("===================================\n".red);

  const { option } = await inquirer.prompt(questionsMenu);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".blue} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "Input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Debes escribir algo para continuar";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const deleteTaskList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${indx} ${tarea.desc}`,
    };
  });
  choices.push({
    value: "0",
    name: "0.".green + " Salir al menú principal".yellow,
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar tarea",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const uSureBro = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showTasksToCheck = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${indx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciona",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};
module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  uSureBro,
  deleteTaskList,
  showTasksToCheck,
};
