import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';
import * as validacion from "#Lib/validaciones/validacion.js";
import * as rules from '#Lib/validaciones/rules.js';
// import { body, validationResult} from 'express-validator';
const gestorRouter = Router()


// ///// GESTOR


gestorRouter.put('/update/', gestor.updateGestorController)

// //// RESPONSABLE

gestorRouter.post('/register/responsable',gestor.createResponsableController)
// eliminar responsable

// //// EMPRESA
// gestorRouter.put('/empresa/update/', rules.rulesEmpresa,validacion.validarCampos,empresa.updateEmpresaController)
gestorRouter.put('/empresa/update/',empresa.updateEmpresaController)
gestorRouter.delete('/empresa/delete/', empresa.deleteEmpresaController)
gestorRouter.get('/empresa/empleados', empresa.getEmployeesControllers) 

// //// OFERTAS
gestorRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 

gestorRouter.post('/oferta/registrar',oferta.ofertaRegisterController) 


gestorRouter.put('/oferta/update/:id',rules.rulesOferta,validacion.validarCampos, oferta.updateOfertaController)  
gestorRouter.delete('/oferta/remove/:ofertaId', oferta.removeOfertaController)  

// ver postulantes a la oferta
// cambiar estado de la inscripcion


gestorRouter.put('/oferta/estado/:idInscripcion', empresa.cambiarEstadoInscripcion)  


export default gestorRouter