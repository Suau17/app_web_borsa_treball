import * as oferta from '#controllers/oferta.controller.js';
import {Router} from 'express';

const userRouter = Router();



userRouter.get('/', oferta.getOfertasController) 

userRouter.get('/crear', function (req, res) {  res.render('ofertas/registrar') }) 
userRouter.post('/registerOferta', oferta.ofertaRegisterController) 
userRouter.get('/inscribir', oferta.inscribirUsuario) 

userRouter.get('/update/:id', oferta.updateController)
userRouter.post('/update/:id', oferta.updateOfertaController)
userRouter.put('/updateOferta/:id', oferta.updateOfertaController)  
userRouter.delete('/remove/:ofertaId', oferta.removeOfertaController)  




export default userRouter;