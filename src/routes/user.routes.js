import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'



const userRouter = Router()


userRouter.get('/getUsers',  userC.getUsersControllers ) // funciona (json no view)
userRouter.get('/register', function (req, res){
    res.render('usersView/register'); 
}); 
userRouter.post('/registerUser', userC.userRegistrerController) // funciona
userRouter.post('/login', userC.userLoginController ) 
userRouter.post('/delete/userId', userC.userDeleteControllers )
userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')

export default userRouter