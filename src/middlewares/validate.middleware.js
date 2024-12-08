import { ValidationError } from "../errors/TypesError.js";

export const validationMiddleware = (validatorFn) => {
return (req, res, next) => {
    try {
        validatorFn(req.body) // interesa validar el body de la request
        next(); // pasa a la sgte operacion ya que lo unico que hace este middleware es validar , pasa a controller u otro middleware segun el caso
    } catch (error) {
        if(error instanceof ValidationError) {  
            res.status(400).json({
                message: 'Error de Validacion',
                details: error
            })
        } 
        next(error)

        //si es instancia de ValidationError,  muestra status , sino se pasa a internal u otro error especifico
    }
}
}


//cuando se usa middleware y se quiere mandar algo aparte del req, res, next y err, pasan cosas raras. 
//como parametro se manda lo que se quiere evaluar
//Se sacan y se hace un return que devuelve una funcion que recibe el req,res, next
