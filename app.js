require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausaMenu,
  leerInput,
  ListadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  console.clear();

  let opt = "";
  const tareas = new Tareas();
  const TareasDB = leerDB();

  if (TareasDB) {
    tareas.cargarTareasFromArray(TareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput("Description:");
        tareas.crearTarea(desc);
        break;

      case '2':
        tareas.listadoCompleto();
        break;

      case '3':
        tareas.listarPendientesCompletadas(true);
        break;

      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
        case '5':
       const ids= await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        const id = await ListadoTareasBorrar(tareas.listadoArr);
        if(id !== '0'){
          const ok = await confirmar("Are you sure?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Task Deleted');
          }
        }
       
        break;
   
    }

    guardarDB(tareas.listadoArr);

    await pausaMenu();
  } while (opt !== "0");
};

main();
