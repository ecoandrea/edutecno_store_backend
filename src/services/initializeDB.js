import { TableDb } from "../utils/db/createDbTables.js";

import { connectDb } from '../utils/db/connectDB.js'
import { createTableQueries } from "../utils/constants/createTablesQueries.js";
import { DataBaseError } from "../errors/TypesError.js";


export const initializeDB = async() => {
    try {
        for (const query of createTableQueries) {
            await TableDb.create(query)
        }

        console.log('Tablas cargadas con éxito!');

        const { now } = await connectDb();
        console.log(`Conexión éxitosa a PostgreSQL realizada el ${now}`);

    } catch (error) {
        throw new DataBaseError('Error al inicializar la base de datos en PostgreSQL', error);
    }
};


//no se usa forEach porque toma todo como un conjunto de proceso, se toma como una sola ejecucion, y como es asyncrona no funciona como esperamos
// for of funciona mejor recorre paso a paso contenido de array y es una secuencializacion de procesos, 