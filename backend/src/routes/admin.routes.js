/// RUTAS PARA OBTENER DATOS DE LA APLICACION (NUMERO DE OFERTAS, TOTAL INSCRITOS, TOTAL TRABAJANDO, ETC.)O GESTIONAR COSAS 

// habilitar perfil
import * as admin from '#controllers/admin.crontroller.js';
import { checkAuthUser } from '#Lib/auth.js';
import {Router} from 'express';

const adminRouter = Router();

adminRouter.post('/ciclo/register', admin.cicloRegistrerController)
adminRouter.put('/habilitarGestor/:id', admin.habilitarGestorController)  
adminRouter.get('/eliminarUsuario/:id', admin.eliminarUsuario)
adminRouter.delete('/deleteUser' , admin.eliminarUsuario)
adminRouter.put('/update', checkAuthUser , admin.updateAdminController)
export default adminRouter