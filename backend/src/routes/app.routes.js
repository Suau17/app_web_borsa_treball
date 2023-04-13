import * as oferta from '#controllers/oferta.controller.js';
// RUTAS PARA OBTENER DATOS Y ALIMENTAR EL FRONTEND
import * as userC from '#controllers/user.controller.js'
import * as gestor from '#controllers/gestorController.js'

import * as estudiante from '#controllers/estudiantes.controller.js'

import * as empresa from '#controllers/empresa.controller.js'

import {Router} from 'express';

const appRouter = Router();


// RUTAS GENERALES PARA GESTION CRUD USUARIOS

// agragar rutas rol estudiante, rol admin, rol gestor, rol responsable y rol app
appRouter.get('/getUsers',   userC.getUsersControllers)
appRouter.get('/getOfertas', oferta.getOfertasController) 
appRouter.get('/getOfertas/:id', oferta.getOfertasEmpresa) 
appRouter.get('/oferta/:idOferta', oferta.getOfertaController) 
appRouter.get('/getEmpresa', empresa.getEmpresaControllers)

appRouter.get('/user/:id', userC.searchUser)
appRouter.get('/oferta/:idOferta/inscripciones', oferta.getInscritosController)
appRouter.get('/curriculum/:id', estudiante.downloadCurriculumController)
appRouter.post('/register', gestor.gestorRegistrerController)

export default appRouter