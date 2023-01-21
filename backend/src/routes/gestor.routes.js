import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';

const gestorRouter = Router()


// ///// GESTOR
gestorRouter.put('/update/:id', gestor.updateGestorController)
gestorRouter.delete('/eliminar/:userId', userC.deleteUserController)

// //// RESPONSABLE
gestorRouter.post('/register/responsable', gestor.createResponsableController)
// eliminar responsable

// //// EMPRESA
gestorRouter.post('/empresa/registrar', empresa.empresaRegistrerController)
gestorRouter.put('/empresa/update/:id', empresa.updateEmpresaController)
gestorRouter.delete('/empresa/delete/:id', empresa.deleteEmpresaController)
gestorRouter.post('/empresa/ofertas/:idOferta/eliminar', gestor.createResponsableController)


// //// OFERTAS
gestorRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 

gestorRouter.post('/oferta/registrar', oferta.ofertaRegisterController) 


gestorRouter.put('/oferta/update/:id', oferta.updateOfertaController)  
gestorRouter.delete('/oferta/remove/:ofertaId', oferta.removeOfertaController)  

// ver postulantes a la oferta
// cambiar estado de la inscripcion

gestorRouter.put('/oferta/estado/:id', empresa.estadoInscripcion)  

export default gestorRouter