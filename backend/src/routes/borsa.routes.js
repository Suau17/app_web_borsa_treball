import * as oferta from '#controllers/oferta.controller.js';
import * as estudiante from '#controllers/estudiantes.controller.js';
import {Router} from 'express';

const userRouter = Router();



userRouter.get('/', oferta.getOfertasController) 
userRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 

userRouter.get('/crear', function (req, res) {  res.render('ofertas/registrar') }) 
userRouter.post('/registerOferta', oferta.ofertaRegisterController) 
userRouter.post('/inscribir', estudiante.inscribirseOferta) 

userRouter.get('/update/:id', oferta.updateController)
userRouter.post('/update/:id', oferta.updateOfertaController)
userRouter.put('/updateOferta/:id', oferta.updateOfertaController)  
userRouter.delete('/remove/:ofertaId', oferta.removeOfertaController)  




export default userRouter;