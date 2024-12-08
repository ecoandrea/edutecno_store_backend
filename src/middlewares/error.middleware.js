import { CustomError } from "../errors/CustomError.js"
import { InternalServerError } from "../errors/TypesError.js"


export const errorHandler = (err, req, res, next) => { //siempre se manda estos 4 parametros, aunque no se usen , express la puede pedir
    if(!(err instanceof CustomError)) {
        err = new InternalServerError(
            err.message || 'Error Inesperado',
            'Ups! Tenemos un error imprevisto, por favor contacta con nuestro equipo de soporte'
        )
    }

    //respuesta de error
    const errorResponse = {
        status: 'Error',
        message: err.message,
        code: err.statusCode,
        details: err.details
    }

    console.error(`ERROR: ${err.message} --- Details: ${err.details} ---- status: ${err.statusCode}`)

    res.status(err.statusCode).json(errorResponse)
}

//middleware siempre lleva next