import { query } from "../../config/db.config.js";
import { DataBaseError } from "../../errors/TypesError.js";
import { getTableDetails, tableExists } from "./confirmDetailsTables.js";


//se usa func estatica para traer metodo de la clase sin tener que instancear un objeto. se invoca directamente desde la entidad de la clase  sin tener que crear un hijo para poder llamarla

export class TableDb {
  static async create({ queryText, name }) {
      try {
          const exists = await tableExists(name);
          await query(queryText)
          const tableDetails = await getTableDetails(name);
  
          exists
            ? console.log(`Tabla "${name}" ya existe en la base de datos. Detalles: `)
            : console.log(`Tabla "${name}" verificada y creada con éxito. Detalles: `);
  
          
          console.table(tableDetails)
  
      } catch (error) {
          throw new DataBaseError(`Error al crear la tabla ${name}`, error)
      }
  };
  
}
