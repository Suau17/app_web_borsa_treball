import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'

const gestorRouter = Router()

gestorRouter.post('/register', gestor.gestorRegistrerController)
gestorRouter.post('/register/responsable', gestor.createResponsableController)
gestorRouter.put('/update/:id', gestor.updateGestorController)
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