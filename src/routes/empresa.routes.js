import {Router} from 'express'
import * as empresa from '#controllers/gestorController.js'

const empresaRouter = Router();

empresaRouter.get('/getEmpresa',  empresa.getempresaControllers ) // funciona (json no view)
empresaRouter.get('/register', function (req, res){
    res.render('usersView/register'); 
}); 