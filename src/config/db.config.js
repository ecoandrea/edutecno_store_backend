import pkg from 'pg';
import dotenv from 'dotenv';

//fotenv se carga en el archivo que se va a usr, no siempre funciona estando dolo en main 

dotenv.config()

const { Pool } = pkg;

const pool = new Pool({  //info de db dentro de object
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

export const query = (text, params) => pool.query(text, params) //funcion que arma las querys , se le pasa el text y parametro, y asi se hace un solo llamado