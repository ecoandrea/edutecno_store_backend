import { query } from "../../config/db.config.js"


export const connectDb = async () => {
    try {
        const { rows } = await query('SELECT NOW()');
        return rows[0]  //devuelve un array , [0] sacame el primer dato
    } catch (error) {
        console.error(`No nos pudimos conectar a la DB ${error}`)
    }
}

// {rows} al llamar query se devuelve un json con la info de la consulta , manda mucha info, pero solo interesa la parte del rows
// rows son los datos de la fila completa de la tabla