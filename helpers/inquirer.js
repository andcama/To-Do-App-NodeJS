const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "What do you wanna do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const pausaMenu = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"enter".green} to continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================".green);
  console.log("Selects an option".white);
  console.log("=======================".green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const ListadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value:'0',
    name:'0.'.green + 'Cancel'
  })
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
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


const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
      const idx = `${i + 1}`.green;
      return {
        value: tarea.id,
        name: `${idx} ${tarea.desc}`,
        checked:(tarea.completadoEn) ? true : false
      };
    });
  
  
    const pregunta = [
      {
        type: "checkbox",
        name: "ids",
        message: "Selections",
        choices,
      },
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
  };

module.exports = {
  inquirerMenu,
  pausaMenu,
  leerInput,
  ListadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};
