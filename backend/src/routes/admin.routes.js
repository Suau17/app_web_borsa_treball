/// RUTAS PARA OBTENER DATOS DE LA APLICACION (NUMERO DE OFERTAS, TOTAL INSCRITOS, TOTAL TRABAJANDO, ETC.)O GESTIONAR COSAS 

// habilitar perfil
import * as admin from '#controllers/admin.crontroller.js';
import { checkAuthUser } from '#Lib/auth.js';
import {Router} from 'express';
import * as validacion from "#Lib/validaciones/validacion.js";
import * as rules from '#Lib/validaciones/rules.js';

const adminRouter = Router();

adminRouter.post('/ciclo/register',rules.rulesCiclo, validacion.validarCampos, admin.cicloRegistrerController)
adminRouter.put('/habilitarGestor/:id', admin.habilitarGestorController)  
adminRouter.get('/eliminarUsuario/:id', admin.eliminarUsuario)
adminRouter.delete('/deleteUser' , admin.eliminarUsuario)

adminRouter.get('/stats/user', admin.contarUsuariosEsteAño)
adminRouter.get('/stats/ofertas', admin.contarOfertasPorCiclo)

adminRouter.put('/update', checkAuthUser , admin.updateAdminController)
export default adminRouter