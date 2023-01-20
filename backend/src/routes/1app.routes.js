import * as oferta from '#controllers/oferta.controller.js';
// RUTAS PARA OBTENER DATOS Y ALIMENTAR EL FRONTEND
import * as userC from '#controllers/user.controller.js'
import * as gestor from '#controllers/gestorController.js'
import {Router} from 'express';
import { checkAuth, checkAuth_Gestor } from '#Lib/auth.js'

const appRouter = Router();


// RUTAS GENERALES PARA GESTION CRUD USUARIOS


appRouter.get('/getUsers',   userC.getUsersControllers)
appRouter.get('/getOfertas', oferta.getOfertasController) 
appRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 


appRouter.post('/register', gestor.gestorRegistrerController)