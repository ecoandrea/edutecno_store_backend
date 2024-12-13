
import { Usuario } from "../models/Usuario.model.js"
import { VALID_USER_FIELD } from "../utils/constants/validateFields.js";
import { Validation } from "../utils/validate/Validate.js";


export const createUser = async(req, res, next) => {
    try {
        const user = await Usuario.create(req.body);

        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const findAllActiveUsers = async(req, res, next) => {
    try {
        const users = await Usuario.findAllActive();
        const userValidate = Validation.isEmptyDataResponse(users);

        res.status(200).json({
            message: "Usuarios Encontrados con éxito",
            status: 200,
            data: userValidate,
        });
    } catch (error) {
        next(error)
    }
}

export const findUserActiveById = async(req, res, next) => {
    try {
        const { id } = req.params

        const user = await Usuario.findActiveById(id)
        const userValidate = Validation.isEmptyDataResponse(user);

        res.status(200).json({
            message: `Usuario con ID_ ${id} Encontrado con éxito`,
            status: 200,
            data: userValidate,
        });
    } catch (error) {
        next(error)
    }
}


export const findUserByFilters = async(req, res, next) => {
    try {
        const filters = req.query;//para obtener parametros de la consulta
        const { condition } = req.body;

        //antes de mandar busqueda controllador se asegura que campos sean validos
        Validation.isValidFilter(filters, VALID_USER_FIELD) //si se recibe campo valido o no
        const users = await Usuario.find(filters, condition) 
        const userValidate = Validation.isEmptyDataResponse(users) //que no este vacio

        res.status(200).json({
            message: "Usuario encontrado con éxito",
            status: 200,
            data: userValidate,
        });
    } catch (error) {
        next(error)
    }
}


export const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body

        const updatedUser = await Usuario.update(id, data)

        res.status(201).json({
            message: `Usuario Actualizado con Éxito`,
            status: 201,
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}


export const permaDeleteUser = async(req, res, next) => {
    try {
        const { id } = req.params

        const userDeleted = await Usuario.permaDelete(id);

        res.status(200).json({
            message: `Usuario Eliminado Permanentemente!`,
            status: 200,
            dataDeleted: userDeleted
        })
    } catch (error) {
        next(error)
    }
}


export const softDeleteUser = async(req, res, next) => {
    try {
        const { id } = req.params

        const userDeleted = await Usuario.softDelete(id);

        res.status(200).json({
          message: `Usuario Eliminado con éxito`,
          status: 200,
          dataDeleted: userDeleted,
        });
    } catch (error) {
        next(error)   
    }
}


//res.queryse  usa cuando necesitas acceder a los parámetros de la URL que están después del signo de interrogación (?)
//para telefono en vez e +56 en url de postman , usar http://localhost:4500/api/v1/usuario/filters?telefono=%2b56978935678
//condicion AND http://localhost:4500/api/v1/usuario/filters?nombre=Jorge&apellido_paterno=Curioso
//CONDICION OR http://localhost:4500/api/v1/usuario/filters?nombre=Jorge&apellido_paterno=Reyes
