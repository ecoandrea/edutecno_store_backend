
import { InternalServerError } from "../../errors/TypesError.js";
import { Validation } from "../validate/Validate.js";
/**
 * Convierte datos de una petición en arrays de columnas y valores para ser inyectados en una consulta SQL
 * @param {object} data - Data que contiene columnas y valores para una Consulta SQL 
 * @returns {object<Array>} - Devuelve un Objeto con dos arrays en los campos columns y values
 */

//convierte los datos de objeto de columna y valores a un array
export const parseObjectToColumnsValuesArrays = (data) => {
    try {
        const columnsData = Object.keys(data);  //Devuelve un Array con todas las Keys o claves de un objeto dado
        const valuesData = Object.values(data); // Devuelve un Array con todos los valores de un objeto dado


        const { columns, values } = Validation.isDataEmptyToDataBase(columnsData, valuesData)

        return {columns, values}
    } catch (error) {
        throw new InternalServerError('Error al convertir los datos a columnas y valores', error)        
    }
}


/**
 * Construye una clausula con valores parametrizados en función de la cantidad de campos en los datos entregados
 * @param {Array<string>} columns - Columnas que se van a modificar en la query 
 * @param {string} separator - Separador de condicion o agregación en la clausula
 * @param {boolean} requireKey - Valor booleano (true/false) que determina si la clausula requiere acompañar los valores paramatrizados con una key
 * @returns {string} - Retorna la clausula con datos parametrizados en formato string
 */

//normaliza las clausulas
export const normalizeClauses = (columns, separator, initParam = 1, requireKey = true) => {  //quedan con valores por default , 1 es el mas comun de empezar
    try {
        let clauses = ''

        !requireKey
        ? clauses = columns.map((_, i) => `$${i + initParam}` ).join(`${separator}`)
        : clauses = columns.map((key, index) => `${key} = $${index + initParam}`).join(`${separator}`);

        return clauses
    } catch (error) {
        throw new InternalServerError('Error al construir la clausula para la consulta SQL', error)
    }
}