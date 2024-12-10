import { Usuario } from "../models/Usuario.model.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await Usuario.create(req.body);

    res.status(201).json({
      message: "Usuario creado con éxito",
      status: 201,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const findAllActiveUsers = async (req, res, next) => {
  try {
    const users = await Usuario.findAllActive();
    res.json({
      message: "Usuarios encontrados con éxito",
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const findUserActiveById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findActiveById(id);

    res.status(200).json({
      message: `Usuario con ID_ ${id} Encontrado con éxito`,
      status: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const findUserByFilters = async (req, res, next) => {
  try {
    const filters = req.query; //para obtener parametros de la consulta
    const { condition } = req.body;

    const users = await Usuario.find(filters, condition);

    res.status(200).json({
      message: "Usuario encontrado con éxito",
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

//res.queryse  usa cuando necesitas acceder a los parámetros de la URL que están después del signo de interrogación (?)
//para telefono en vez e +56 en url de postman , usar http://localhost:4500/api/v1/usuario/filters?telefono=%2b56978935678
//condicion AND http://localhost:4500/api/v1/usuario/filters?nombre=Jorge&apellido_paterno=Curioso
//CONDICION OR http://localhost:4500/api/v1/usuario/filters?nombre=Jorge&apellido_paterno=Reyes
