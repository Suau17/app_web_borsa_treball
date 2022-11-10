import * as oferta from '#controllers/oferta.controller.js';
import {Router} from 'express';

const userRouter = Router();


userRouter.get('/', oferta.getOfertasController) ;

userRouter.post('/borsa/registrar', function (req, res){
    res.render('ofertas/registrar.ejs'); 
}); 

userRouter.post('/crear', function (req, res) {
    res.render('ofertas/registrar') ;


}) 
userRouter.post('/borsa/registerOferta', oferta.ofertaRegisterController) ;
userRouter.get('/borsa/getOfertas', oferta.getOfertasController) ;
userRouter.patch('/borsa/update-data');



export default userRouter;