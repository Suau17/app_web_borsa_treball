import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';
import * as validacion from "#Lib/validaciones/validacion.js";
import * as rules from '#Lib/validaciones/rules.js';

import { body, validationResult} from 'express-validator';
const gestorRouter = Router()


// ///// GESTOR

//hecho
gestorRouter.put('/update/',rules.rulesGestorUpdate, validacion.validarCampos, gestor.updateGestorController)

// //// RESPONSABLE

gestorRouter.post('/register/responsable',rules.rulesResp, validacion.validarCampos, gestor.createResponsableController)
// eliminar responsable

// //// EMPRESA
gestorRouter.post('/empresa/registrar',rules.rulesEmpresa, validacion.validarCampos, empresa.empresaRegistrerController)
// gestorRouter.put('/empresa/update/',rules.rulesUpdateEmpresa,  validacion.validarCampos ,empresa.updateEmpresaController)
gestorRouter.put('/empresa/update/',empresa.updateEmpresaController)
gestorRouter.delete('/empresa/delete/', empresa.deleteEmpresaController)
gestorRouter.post('/empresa/ofertas/:idOferta/eliminar', gestor.createResponsableController)
gestorRouter.get('/empresa', empresa.getEmpresaControllers)
gestorRouter.get('/empresa/empleados', empresa.getEmployeesControllers) 

// //// OFERTAS
gestorRouter.get('/getOfertas', oferta.getOfertaEmpresaController) 

//gestorRouter.post('/oferta/registrar',rules.rulesOferta,validacion.validarCampos, oferta.ofertaRegisterController) 
gestorRouter.post('/oferta/registrar',rules.rulesOferta, validacion.validarCampos, oferta.ofertaRegisterController) 

// falta validar
gestorRouter.put('/oferta/update/:id', rules.rulesOferta, validacion.validarCampos, oferta.updateOfertaController)  
gestorRouter.delete('/oferta/remove/:ofertaId', oferta.removeOfertaController)  

// ver postulantes a la oferta
// cambiar estado de la inscripcion

//treballador
gestorRouter.delete('/empresa/empleado/delete', gestor.deleteEmpleados)



gestorRouter.put('/oferta/estado/:idInscripcion', empresa.cambiarEstadoInscripcion)  


export default gestorRouter