import { Router } from 'express'
import * as empresa from '#controllers/gestorController.js'

const empresaRouter = Router()

empresaRouter.get('/', empresa.getEmpresasController)
empresaRouter.get('/registrar',function(req, res){
  res.render('empresa/registrar')
})
empresaRouter.post('/registrarEmpresa', empresa.rules, empresa.registerEmpresaControllers)


/*
userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/gest-oferta')  
userRouter.patch('/crear-oferta')
userRouter.del('/del-oferta') */


export default empresaRouter