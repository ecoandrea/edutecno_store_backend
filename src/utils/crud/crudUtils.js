import { query } from "../../config/db.config.js";
import { InternalServerError } from "../../errors/TypesError.js";


/**
 * Crea un nuevo registro en una tabla especifica a traves de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos
 * @param {object} data - Datos que se enviaran a registrar
 * @returns {Promise<object>} - Retorna el registro creado en formato de objeto
 */
export const createRecord = async(tableName, data) => { 
    try {
        const columns = Object.keys(data) //Devuelve un Array con todas las Keys o claves de un objeto dado
        const values = Object.values(data) // Devuelve un Array con todos los valores de un objeto dado
        const placeholders = columns.map((_, i) => `$${i + 1}` );

        const insertQuery = `
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${placeholders.join(', ')})
            RETURNING *
        `
      

        const { rows } = await query(insertQuery, values);
        return rows[0];
    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`);
    }

}


//este archivo se genera dinamica de crud para que sea automatica
//columnas llegan como string y se deben convertir aplicando join , separado por coma 
//en VALUES viene la estructura y se deben parametizar 
//se transforma los datos , se saca posiciones con columnas mapeadas, _ es elemento, i es la posicion, se podria usar values en vez de columnas
//lo que importa es i osea la posicion
//signo peso y la i , pero se le suma 1 porque array parte en 0

//como devuelve map un array hay que convertirlo en string con  metodo join

//funciones que se van a utilizar mucho ,ideal documentar