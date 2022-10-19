import {Router} from 'express'

const userRouter = Router()
/*registrar manual al gestor*/ 
userRouter.post('/register')

userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/gest-oferta')  
userRouter.patch('/crear-oferta')
userRouter.del('/del-oferta')


export default userRouter