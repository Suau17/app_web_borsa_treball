import { Router } from 'express'
import * as empresa from '#controllers/gestorController.js'

const empresaRouter = Router()

empresaRouter.get('/', empresa.getEmpresasController)
empresaRouter.post('/registerEmpresa', empresa.rules, empresa.registerEmpresaControllers)

empresaRouter.get('/getEmpresa', empresa.getempresaControllers) // funciona (json no view)
empresaRouter.get('/register', function (req, res) {
  res.render('usersView/register');
});
/*
userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/gest-oferta')  
userRouter.patch('/crear-oferta')
userRouter.del('/del-oferta') */


export default empresaRouter