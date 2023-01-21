import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'
import { checkAuth, getUserToken } from '#Lib/auth.js'

// RUTAS GENERALES PARA GESTION CRUD USUARIOS

const userRouter = Router()


userRouter.get('/getUsers',  checkAuth ,userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/userInfo/:id',  userC.infoUser ) // funciona (json no view)
userRouter.get('/register', function (req, res){
    res.render('usersView/register'); 
}); 
userRouter.post('/registerUser', userC.userRegistrerController) // funciona


// userRouter.get('/login', function (req, res){
//     res.render('usersView/login'); 
// }); 
userRouter.post('/login', userC.userLoginController)

// userRouter.post('/login', userC.userLoginController ) 


userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')

// ruta para recuperar contraseña

export default userRouter