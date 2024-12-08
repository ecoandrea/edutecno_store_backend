import { Router } from 'express'
import { createUser } from '../controllers/usuario.controller.js';
import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Usuario } from '../models/Usuario.model.js';


const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate),  createUser); //middleware queda entre ruta que trae peticion  y controller que gestiona respuesta


export default router