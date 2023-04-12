/// RUTAS PARA OBTENER DATOS DE LA APLICACION (NUMERO DE OFERTAS, TOTAL INSCRITOS, TOTAL TRABAJANDO, ETC.)O GESTIONAR COSAS 

// habilitar perfil
import * as admin from '#controllers/admin.crontroller.js';
import {Router} from 'express';

const adminRouter = Router();

adminRouter.put('/habilitarGestor/:id', admin.habilitarGestorController)  
adminRouter.get('/eliminarUsuario/:id', admin.eliminarUsuario)
adminRouter.delete('/deletUser' , admin.eliminarUsuario)
export default adminRouter