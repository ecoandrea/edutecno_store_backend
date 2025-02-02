//mecanismo que me muestre en consola lo que se ha hecho
// funcion que se usa diccionarioque muestra raiz de tabla

import { query } from "../../config/db.config.js";

export const getTableDetails = async (tableName) => {
  try {
      const queryDictionary = `
          SELECT
              column_name,
              data_type,
              column_default,
              is_nullable
          FROM 
              information_schema.columns
          WHERE
              table_name = $1
          ORDER BY
              ordinal_position;
      `;

    const value = [tableName]; 

    const { rows } = await query(queryDictionary, value);
    return rows;
} catch (error) {
    console.error(`Error al crear el diccionario de la tabla "${tableName}". ERROR: ${error}`)
}
}

//funcion para saber si existe o no tabla
export const tableExists = async(tableName) => {
    try {
        const queryExists = `
            SELECT EXISTS (          
                SELECT FROM information_schema.tables
                WHERE table_name = $1
            );
        `
        const value = [tableName];
    
        const { rows } = await query(queryExists, value)
        return rows[0].exists  //la confirmacion si existe
        
    } catch (error) {
        console.error(`Error al verificar si existe la tabla "${tableName}"`)
    }

}

//SELECT EXISTS si la query existe o no

