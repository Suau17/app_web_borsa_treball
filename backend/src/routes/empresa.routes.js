import {Router} from 'express'
import * as empresa from '#controllers/empresa.controller.js'

const empresaRouter = Router();

empresaRouter.get('/',  empresa.getEmpresaControllers ) // funciona (json no view)
empresaRouter.get('/registrar',function(req, res){
  res.render('empresa/registrar')
})
empresaRouter.post('/registrar', empresa.empresaRegistrerController)
empresaRouter.put('/update/:id', empresa.updateEmpresaController)
empresaRouter.delete('/delete/:id', empresa.deleteEmpresaController)




export default empresaRouter