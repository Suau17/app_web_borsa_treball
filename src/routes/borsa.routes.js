import * as oferta from '#controllers/oferta.controller.js'
import {Router} from 'express'

const userRouter = Router()


userRouter.get('/', oferta.getOfertasController) 
userRouter.get('borsa/registrar', function (req, res) {
    res.render('borsa/registrar')  
}) 
userRouter.post('/borsa/registerOferta', oferta.ofertaRegisterController) 
userRouter.patch('/borsa/update-data')  



export default userRouter