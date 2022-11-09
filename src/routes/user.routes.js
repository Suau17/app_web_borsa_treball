import * as userC from '#controllers/user.controller.js'
import {Router} from 'express'



const userRouter = Router()


userRouter.get('/',  userC.getUsersControllers ) // funciona (json no view)
userRouter.post('/register', userC.userRegistrerController) // funciona
userRouter.post('/login', userC.userLoginController ) 
userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')

export default userRouter