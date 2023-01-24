import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import * as estudiante from '#controllers/estudiantes.controller.js'
import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';

const estudianteRouter = Router()


// ///// GESTOR
estudianteRouter.post('/oferta/inscribirse', estudiante.inscribirseOferta)
estudianteRouter.delete('/eliminar/:userId', userC.deleteUserController)

// //// RESPONSABLE
estudianteRouter.post('/registrar', estudiante.estudianteRegistrerController)




export default estudianteRouter