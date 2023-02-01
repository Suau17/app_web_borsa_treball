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


gestorRouter.put('/update/', rules.rulesGestor,validacion.validarCampos,gestor.updateGestorController)
gestorRouter.delete('/eliminar/', userC.deleteUserController)

// //// RESPONSABLE

gestorRouter.post('/register/responsable', rules.rulesEmpresa,validacion.validarCampos,gestor.createResponsableController)
// eliminar responsable

// //// EMPRESA
gestorRouter.post('/empresa/registrar',rules.rulesEmpresa,validacion.validarCampos, empresa.empresaRegistrerController)
gestorRouter.put('/empresa/update/', rules.rulesEmpresa,validacion.validarCampos,empresa.updateEmpresaController)
gestorRouter.delete('/empresa/delete/', empresa.deleteEmpresaController)
gestorRouter.post('/empresa/ofertas/:idOferta/eliminar',rules.rulesEmpresa,validacion.validarCampos, gestor.createResponsableController)


// //// OFERTAS
gestorRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 

gestorRouter.post('/oferta/registrar',rules.rulesOferta,validacion.validarCampos, oferta.ofertaRegisterController) 


gestorRouter.put('/oferta/update/:id',rules.rulesOferta,validacion.validarCampos, oferta.updateOfertaController)  
gestorRouter.delete('/oferta/remove/:ofertaId', oferta.removeOfertaController)  

// ver postulantes a la oferta
// cambiar estado de la inscripcion

gestorRouter.put('/oferta/estado/:id',rules.rulesOferta,validacion.validarCampos, empresa.estadoInscripcion)  

export default gestorRouter