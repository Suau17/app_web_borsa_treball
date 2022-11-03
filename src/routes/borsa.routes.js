import * as oferta from '#controllers/oferta.controller.js'
import {Router} from 'express'

const userRouter = Router()


userRouter.get('/', (req, res)=>{
 
})
userRouter.post('/registerOferta', oferta.ofertaRegisterController) 
userRouter.get('/getOfertas', oferta.getOfertasController) 
userRouter.post('/profile')
userRouter.patch('/update-data')  
userRouter.patch('/update-email')
userRouter.patch('/update-password')
userRouter.delete('/unregister')



export default userRouter