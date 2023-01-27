import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'
<<<<<<< HEAD
import { body, validationResult} from 'express-validator';
=======
import * as gestor from '#controllers/gestorController.js'
import * as estudiante from '#controllers/estudiantes.controller.js'
import * as auth from '#Lib/auth.js'
>>>>>>> 7795b982210e56fbdd625acb719df46c24167d76

// RUTAS GENERALES PARA GESTION CRUD USUARIOS

const userRouter = Router()


<<<<<<< HEAD
userRouter.get('/getUsers',  userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/userInfo/:id',  userC.infoUser ) // funciona (json no view)
userRouter.get('/register', function (req, res){
    res.render('usersView/register'); 
}); 
userRouter.post('/registerUser', userC.userRegistrerController) // funciona

userRouter.post('/estudiante/registrar',userC.estudianteRegistrerController)
=======
userRouter.get('/getUsers' ,userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/profile/:id',  userC.infoUser ) // funciona (json no view)
>>>>>>> 7795b982210e56fbdd625acb719df46c24167d76

// userRouter.get('/login', function (req, res){
//     res.render('usersView/login'); 
// }); 
userRouter.post('/login', userC.userLoginController)
userRouter.delete('/delete/', auth.checkAuth ,userC.deleteUserController)
userRouter.post('/register/gestor', gestor.gestorRegistrerController)
userRouter.post('/register/estudiante', estudiante.estudianteRegistrerController)
// ruta para recuperar contraseña

export default userRouter

//funcion exists comprueba si se ha introducido algo al campo