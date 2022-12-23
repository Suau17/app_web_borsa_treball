import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'



const userRouter = Router()


userRouter.get('/getUsers',  userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/register', function (req, res){
    res.render('usersView/register'); 
}); 
userRouter.post('/registerUser', userC.userRegistrerController) // funciona
userRouter.post('/estudiante/registrar', userC.estudianteRegistrerController)

userRouter.get('/login', function (req, res){
    res.render('usersView/login'); 
}); 
userRouter.post('/login', userC.userLoginController)

// userRouter.post('/login', userC.userLoginController ) 
userRouter.get('/delete/:userId', userC.deleteUserController)

userRouter.get('/update/:id', userC.updateController)
userRouter.post('/update/:id', userC.updateUserController)

userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')

export default userRouter