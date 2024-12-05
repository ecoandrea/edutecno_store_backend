import { connectDb } from "../utils/db/connectDB.js";


//esto se hace para asegurarme que la base de dato y el servidor se estan cargando, osea anden a la vez , esta seria la union

export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión con PostgreSQL');
        const { now } = await connectDb(); //destructurar la fecha
        console.log(`Conexión éxitosa a PostgreSQL realizada el ${now}`);
        
        app.listen(port, () => {
            console.log(`Servidor andando en el puerto: ${port} 👽`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

//console. para que solo lo vea backend , front no deberia