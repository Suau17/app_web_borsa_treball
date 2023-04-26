import { body, validationResult } from 'express-validator';
import UserModel from "#schemas/User.js"
import empresaModel from '#schemas/empresaSchema.js';

export const rules = [
    //en esta regla estamos indicando al usuario que cuando se registre ç
    //tenga una serie de requisitos como por ejemplo que el mail no sea repetido
    
    body('name','Introduexi un nom').exists().isLength({min:3 ,max:20}),
    body('email','introdueix un E-mail valido').exists().isEmail().custom(async (value, { req }) => {
        const user = await UserModel.findOne({ email: value });
        if (user) {
            throw new Error('Email already in use');
        }
    }),
    body('description').exists().isLength({min:3,max:200}),
    body('passwordHash').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "i")
    .withMessage("password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),

]

export const rulesEmpresa = [
    body('nameEmpresa','Introdueic un nome').exists().isLength({min:3, max:15}).custom(async(value,{req})=>{
        const empresa = await empresaModel.findOne({ nom: value });
        if(empresa){
            throw new Error('El nom ya esta en us');
        }
    }),
    body('direccion','introdueix una direcció valida').exists().not().isEmpty(),
    body('empleados').exists()
]

export const rulesGestor = [
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon').not().isEmpty().isLength({min:4,max:20}),
    body('nameEmpresa', 'introduesi el nom de la mpresa en la que treballes').exists().not().isEmpty(),
]

export const rulesOferta = [
    body('title').exists().not().isEmpty().isLength({min:3,max:250}).withMessage('rellen el camp'),
    body('description').exists().not().isEmpty().isLength({max:250}),
    body('requeriments').exists().not().isEmpty().isLength({max:250}),
    body('skills').exists().not().isEmpty().isLength({max:250}),
    body('ciclo').exists().not().isEmpty().isLength({max:250}),
    body('dateOfPublication').exists().not().isEmpty().toDate().isISO8601().withMessage('La data ha de  estar en format (YYYY-MM-DD)').custom((value) => {
        return value.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) === value;
    }).withMessage('La data ha de  estar en format (DD-MM-YYYY)'),
    
    body('expirationDate').exists().not().isEmpty().toDate().isISO8601().withMessage('La data ha de  estar en format (YYYY-MM-DD)').custom((value) => {
        return value.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) === value;
    }).withMessage('La data ha de  estar en format (DD-MM-YYYY)')
]

export const rulesEstudiante = [
    body('cartaPresentacion').exists().not().isEmpty().isLength({min:3,max:450}),
    body('curriculum').exists().not().isEmpty().isIMEI('archivo/pdf', 'image/png').withMessage('el curriculum ha de ser un arxiu pdf o png'),
]

export const rulesResp = [
    body('name','Ingrese un nom').exists().isLength({min:3 ,max:20}),
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefono')
    .notEmpty().withMessage('El camp de teléfono es obligatori')
    .matches(/^[0-9]{10}$/).withMessage('El telefon ha de tindre 10 caracters')
]

export const rulesCiclo =[
    body('name','Ingrese un nombre').exists().isLength({min:3 ,max:20}),
    body('durada').exists().notEmpty().withMessage('El campo es obligatori')
    .isNumeric().withMessage('El campo ha de ser un numero'),
    body('asignaturas')
    .notEmpty().withMessage('Posa una assignatura')
]