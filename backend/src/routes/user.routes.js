import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as estudiante from '#controllers/estudiantes.controller.js'
import * as auth from '#Lib/auth.js'
import * as validacion from "#Lib/validaciones/validacion.js";
import * as rules from '#Lib/validaciones/rules.js';
import { body, validationResult} from 'express-validator';

// RUTAS GENERALES PARA GESTION CRUD USUARIOS

const userRouter = Router()


userRouter.get('/getUsers' ,userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/profile/:id',  userC.infoUser ) // funciona (json no view)

// userRouter.get('/login', function (req, res){
//     res.render('usersView/login'); 
// }); 
userRouter.post('/login',rules.rules,validacion.validarCampos, userC.userLoginController)
userRouter.delete('/delete/', auth.checkAuth ,userC.deleteUserController)
userRouter.post('/register/gestor',rules.rules,validacion.validarCampos, gestor.gestorRegistrerController)
userRouter.post('/register/estudiante',rules.rules,validacion.validarCampos, estudiante.estudianteRegistrerController)
// ruta para recuperar contraseña

export default userRouter

//funcion exists comprueba si se ha introducido algo al campo