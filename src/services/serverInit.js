
import { initializeDB } from "./initializeDB.js";




export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión con PostgreSQL');
        await initializeDB();
        
        app.listen(port, () => {
            console.log(`Servidor andando en el puerto: ${port} 👽`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

//esto se hace para asegurarme que la base de dato y el servidor se estan cargando, osea anden a la vez , esta seria la union
//console. para que solo lo vea backend , front no deberia