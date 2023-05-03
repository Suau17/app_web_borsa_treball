import { body, check,validationResult } from 'express-validator';
import UserModel from "#schemas/User.js"
import empresaModel from '#schemas/empresaSchema.js';
import EstudiosModel from '#schemas/estudios.schema.js';

export const rules = [
    
    body('name','Introduexi un nom').exists().isLength({min:3 ,max:20}),
    body('email','introdueix un E-mail valido').exists().isEmail().custom(async (value, { req }) => {
        const user = await UserModel.findOne({ email: value });
        if (user) {
            throw new Error('Email already in use');
        }
    }),
    body('description').exists().isLength({min:3,max:200}),
    // body('passwordHash').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "i")
    // .withMessage("password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),

]

export const rulesEmpresa = [
    body('nameEmpresa','Introdueix un nom').isEmpty().isLength({min:3, max:15}),
    body('direccion','introdueix una direcció valida').exists().not().isEmpty(),
]

export const rulesGestor = [
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon').not().isEmpty().isLength({min:4,max:20}),
    body('nameEmpresa', 'introduesi el nom de la mpresa en la que treballes').exists().not().isEmpty(),
]

export const rulesOferta = [
    body('title').exists().not().isEmpty().isLength({min:3,max:250}).withMessage('omple el camp'),
    body('description').exists().not().isEmpty().isLength({max:250}),
    body('requirements').exists().not().isEmpty().isLength({max:250}),
    body('skills').exists().not().isEmpty().isLength({max:250}),
    body('ciclo').exists().custom(async(value)=>{
        const ciclo = await EstudiosModel.findOne({ name: value });
        console.log(ciclo)
        if(!ciclo){
            throw new Error('El cicle no exsisteix');
        }
    }).not().isEmpty().isLength({max:250}),
    
    body('expirationDate').exists().not().isEmpty().isISO8601().withMessage('La data ha de  estar en format (YYYY-MM-DD)')
     
    
]

export const rulesEstudiante = [
    body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
 
  body('cartaPresentacion').notEmpty().withMessage('Presentation letter is required'),
  body('link').isURL({ protocols: ['https'] }).withMessage('Invalid URL format'),
 
  
]

export const rulesResp = [
    body('name','Ingrese un nom').exists().isLength({min:3 ,max:20}),
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon')
    .notEmpty().withMessage('El camp de teléfono es obligatori')
    .matches(/^[0-9]{10}$/).withMessage('El telefon ha de tindre 10 caracters')
]

export const rulesCiclo =[
    body('name','Ingrese un nombre').exists().notEmpty().isLength({min:3 ,max:20}),
    body('durada').exists().notEmpty().withMessage('El camp es obligatori')
    .isNumeric().withMessage('El campo ha de ser un numero'),
    body('asignatures')
    .notEmpty().withMessage('Posa una assignatura')
]


export const rulesUpdateEmpresa=[
    body('nameEmpresa','Introdueix un nom').exists().isLength({min:3, max:15}).custom(async(value,{req})=>{
        const empresa = await empresaModel.findOne({ nom: value });
        if(empresa){
            throw new Error('El nom ya esta en us');
        }
    }),
    body('direccion','introdueix una direcció valida').exists().not().isEmpty(),
]

export const rulesGestorUpdate = [
    body('name','Introduexi un nom').exists().isLength({min:3 ,max:20}),
   
    body('carrec').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon')
    .notEmpty().withMessage('El camp de teléfono es obligatori')
    .matches(/^[0-9]{10}$/).withMessage('El telefon ha de tindre 10 caracters')
   
]

export const rulesAdminUpdate = [
     body('name','Introduexi un nom').exists().isLength({min:3 ,max:20}),
    
    body('cargo').exists().not().isEmpty().isLength({min:3,max:20}),
    body('telefon')
    .notEmpty().withMessage('El camp de teléfono es obligatori')
    .matches(/^[0-9]{10}$/).withMessage('El telefon ha de tindre 10 caracters'),
    body('dni').matches(/^\d{8}[a-zA-Z]$/),

]