import * as oferta from '#controllers/oferta.controller.js';
import {Router} from 'express';

const userRouter = Router();



userRouter.get('/', oferta.getOfertasController) 

userRouter.get('/crear', function (req, res) {  res.render('ofertas/registrar') }) 
userRouter.post('/registerOferta', oferta.ofertaRegisterController) 

userRouter.get('/borsa/update/:id', oferta.updateController) 
userRouter.get('/remove/:ofertaId', oferta.removeOfertaController)  




export default userRouter;