import userRegistrerController from '#controllers/user-registrer.controller.js'
import {Router} from 'express'

const userRouter = Router()

userRouter.get('/', (req, res)=>{
    res.send("hola")
})
userRouter.post('/register', userRegistrerController) 
userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')

export default userRouter