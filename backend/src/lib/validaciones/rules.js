import { body } from 'express-validator';
import UserModel from "#schemas/User.js"
import empresaModel from '#schemas/empresaSchema.js';

export const rules = [
    body('name','Ingrese un nombre').exists().isLength({min:3 ,max:20}),
    body('email','introduce un E-mail valido').exists().isEmail().custom(async (value, { req }) => {
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
    body('nameEmpresa','Introduce un nombre').exists().isLength({min:3, max:15}).custom(async(value,{req})=>{
        const empresa = await empresaModel.findOne({ nom: value });
        if(empresa){
            throw new Error('Nombre already in use');
        }
    }),
    body('direccion','introduce una direccion valida').exists().not().isEmpty(),

    body('empleados').exists()
]

export const rulesGestor = [
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon').not().isEmpty().isLength({min:4,max:20}),
    body('nameEmpresa', 'introduce el nombre de la empresa en la que trabajas').exists().not().isEmpty(),
]

export const rulesOferta = [
    body('title').exists().not().isEmpty().isLength({min:3,max:250}),
    body('description').exists().not().isEmpty().isLength({max:250}),
    body('requeriments').exists().not().isEmpty().isLength({max:250}),
    body('skills').exists().not().isEmpty().isLength({max:250}),
    body('ciclo').exists().not().isEmpty().isLength({max:250}),
    body('dateOfPublication').exists().not().isEmpty().isISO8601().withMessage('La fecha debe estar en formato  (YYYY-MM-DD)'),
    body('expirationDate').exists().not().isEmpty().isISO8601().withMessage('La fecha debe estar en formato (YYYY-MM-DD)')
]

export const rulesEstudiante = [
    body('cartaPresentacion').exists().not().isEmpty().isLength({min:3,max:450}),
    body('curriculum').exists().not().isEmpty().isIMEI('archivo/pdf', 'image/png').withMessage('el curriculum ha de ser un archivo pdf o png'),

]