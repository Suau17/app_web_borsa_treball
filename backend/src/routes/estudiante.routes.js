import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import * as estudiante from '#controllers/estudiantes.controller.js'
import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';
import * as validacion from "#Lib/validaciones/validacion.js";
import * as rules from '#Lib/validaciones/rules.js';

const estudianteRouter = Router()


// ///// GESTOR
estudianteRouter.put('/oferta/inscribirse', estudiante.inscribirseOferta)
estudianteRouter.delete('/oferta/eliminarInscripcion/:idInscripcion', estudiante.borrarInscripcion)
estudianteRouter.delete('/eliminar/:userId', userC.deleteUserController)

// //// RESPONSABLE
//falta validar-porque faltan cosas??
// estudianteRouter.post('/registrar',rules.rulesEstudiante, validacion.validarCampos, estudiante.estudianteRegistrerController)
estudianteRouter.get('/verInscripciones', estudiante.verOfertasInscrito)
estudianteRouter.put('/actualizar', estudiante.updateEstudianteController)




export default estudianteRouter