
import { Router } from 'express'
import { createUser, findAllActiveUsers, findUserActiveById, findUserByFilters, permaDeleteUser, softDeleteUser, updateUser } from '../controllers/usuario.controller.js';
import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Usuario } from '../models/Usuario.model.js';


const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate), createUser);
router.get('/usuario', findAllActiveUsers);//no es necesario middleware porque no comprueba info
router.get('/usuario/id/:id', findUserActiveById);
router.get('/usuario/filters', findUserByFilters);
router.put('/usuario/:id', validationMiddleware(Usuario.validate), updateUser);
router.delete('/usuario/admin/delete/permant/:id', permaDeleteUser);
router.delete('/usuario/:id', softDeleteUser)



export default router

/* e86646c9-c8a8-4473-b08a-d4dad05e9f32*/
//middleware queda entre ruta que trae peticion  y controller que gestiona respuesta