import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'

const gestorRouter = Router()

gestorRouter.post('/register', gestor.gestorRegistrerController)
gestorRouter.post('/register/responsable', gestor.createResponsableController)
gestorRouter.put('/update/:id', gestor.updateGestorController)

gestorRouter.post('/ofertas/:idOferta/eliminar', gestor.createResponsableController)
gestorRouter.delete('/eliminar/:userId', userC.deleteUserController)
 // empresaRouter.get('/', empresa.getEmpresasController)
// empresaRouter.get('/registrar',function(req, res){
//   res.render('empresa/registrar')
// })
// empresaRouter.post('/registerEmpresa', empresa.rules, empresa.registerEmpresaControllers)


/*
userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/gest-oferta')  
userRouter.patch('/crear-oferta')
userRouter.del('/del-oferta') */


export default gestorRouter