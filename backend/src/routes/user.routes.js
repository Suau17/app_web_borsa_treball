import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'
import * as gestor from '#controllers/gestorController.js'

// RUTAS GENERALES PARA GESTION CRUD USUARIOS

const userRouter = Router()


userRouter.get('/getUsers' ,userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/profile/:id',  userC.infoUser ) // funciona (json no view)

// userRouter.get('/login', function (req, res){
//     res.render('usersView/login'); 
// }); 
userRouter.post('/login', userC.userLoginController)
userRouter.delete('/delete/:userId', userC.deleteUserController)
userRouter.post('/register/gestor', gestor.gestorRegistrerController)
// ruta para recuperar contraseña

export default userRouter