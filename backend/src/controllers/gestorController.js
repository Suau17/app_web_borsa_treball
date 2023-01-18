import GestorModel from "#schemas/Gestor.js"
import UserModel from "#schemas/User.js"
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

// import { body, validationResult} from 'express-validator'

// crear empresa + validar dades

// export const rules =  [
//     body("nomEmpresa")
//         .trim()
//         .isLength({ min: 3, max: 50})
//         .withMessage(`Name ha de estar entre 3 y 50`)
//         .escape(),

//     body("nomGestor", "name not correct")
//         .trim()
//         .isLength({ min: 2, max:50})
//     ]

export const gestorRegistrerController = async (req, res) => {
    try {
    const { name, email, passwordHash, rolUser, carrec, telefon, nameEmpresa} = req.body

    
    const exsistingUserByEmail = await UserModel.findOne({email : email})
    if (exsistingUserByEmail) return res.status(400).send('ya exsiste un usuario con ese email registrado')

    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        name,
        email,
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()

    const gestor = new GestorModel({
        carrec,
        telefon,
        nameEmpresa,
        refUser: user._id,
    })
    await gestor.save()

    return res.send('gestor creado con exito')  

} catch (error) {
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');        
}      
}

export const createResponsableController = async (req, res) => {
    try {
    const { name, email, passwordHash, rolUser, carrec, telefon, nameEmpresa} = req.body

    
    const exsistingUserByEmail = await UserModel.findOne({email : email})
    if (exsistingUserByEmail) return res.status(400).send('ya exsiste un usuario con ese email registrado')

    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        name,
        email,
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()

    const gestor = new GestorModel({
        carrec,
        telefon,
        nameEmpresa,
        refUser: user._id,
    })
    await gestor.save()

    return res.send('gestor creado con exito')  
         
} catch (error) {
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');        
}      
}

export const updateGestorController = async (req, res) => {
    try {
        // Obtenemos el id del gestor y los datos a actualizar proporcionados
        const id = req.params.id
        const data = req.body
        // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar
        if (data.password) {
            data.password = await hash(data.password, 12)
        }
        


        // Actualizamos el registro del gestor en la base de datos
        await GestorModel.findByIdAndUpdate(id, req.body, { new: true })
        
        // Enviamos un mensaje de éxito
        return res.send('Datos del gestor actualizados con éxito')
      } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
      }
    }


