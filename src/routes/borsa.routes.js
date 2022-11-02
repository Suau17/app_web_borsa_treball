import userRegistrerController from '#controllers/oferta.controller.js'
import {Router} from 'express'
const userRouter = Router()

userRouter.get('/', (req, res)=>{
 
})
userRouter.post('/register', userRegistrerController) 
userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')


export default userRouter