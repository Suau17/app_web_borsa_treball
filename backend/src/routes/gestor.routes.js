import { Router } from 'express'
import * as gestor from '#controllers/gestorController.js'
import * as userC from '#controllers/user.controller.js'

import { body, validationResult} from 'express-validator';





import * as empresa from '#controllers/empresa.controller.js'
import * as oferta from '#controllers/oferta.controller.js';

const gestorRouter = Router()


// ///// GESTOR
gestorRouter.post('/registrar', gestorRouter.post('/register', [
    
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
},gestor.gestorRegistrerController))

gestorRouter.put('/update/', gestor.updateGestorController)
gestorRouter.delete('/eliminar/', userC.deleteUserController)

// //// RESPONSABLE

gestorRouter.post('/register/responsable', gestor.createResponsableController)
// eliminar responsable

// //// EMPRESA
gestorRouter.post('/empresa/registrar', empresa.empresaRegistrerController)
gestorRouter.put('/empresa/update/', empresa.updateEmpresaController)
gestorRouter.delete('/empresa/delete/', empresa.deleteEmpresaController)
gestorRouter.post('/empresa/ofertas/:idOferta/eliminar', gestor.createResponsableController)


// //// OFERTAS
gestorRouter.get('/getOfertas/:id', oferta.getOfertaEmpresaController) 

gestorRouter.post('/oferta/registrar', oferta.ofertaRegisterController) 


gestorRouter.put('/oferta/update/:id', oferta.updateOfertaController)  
gestorRouter.delete('/oferta/remove/:ofertaId', oferta.removeOfertaController)  

// ver postulantes a la oferta
// cambiar estado de la inscripcion

gestorRouter.put('/oferta/estado/:id', empresa.estadoInscripcion)  

export default gestorRouter