import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'
import { body, validationResult} from 'express-validator';

const gestorRouter = Router()

gestorRouter.post('/register', [
    
    body('nom','Ingrese un nombre').exists().isLength({min:3 ,max:20}),
    body('email','introduce un E-mail valido').exists().isEmail().custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email already in use');
        }
    }),
    body('description').exists().isLength({min:3,max:200}),
    body('passwordHash').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "i")
    .withMessage("password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // Continuar con el procesamiento de la solicitud si no hay errores
},gestor.gestorRegistrerController)
gestorRouter.post('/register/responsable', gestor.createResponsableController)
gestorRouter.put('/update/:id', gestor.updateGestorController)

gestorRouter.post('/ofertas/:idOferta/eliminar', gestor.createResponsableController)
gestorRouter.delete('/eliminar/:userId', userC.deleteUserController)
 // empresaRouter.get('/', empresa.getEmpresasController)
// empresaRouter.get('/registrar',function(req, res){
//   res.render('empresa/registrar')
// })
// empresaRouter.post('/registerEmpresa', empresa.rules, empresa.registerEmpresaControllers)


/*
userRouter.post('/login')
userRouter.post('/profile')
userRouter.patch('/gest-oferta')  
userRouter.patch('/crear-oferta')
userRouter.del('/del-oferta') */


export default gestorRouter