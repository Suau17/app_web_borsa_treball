import UserModel from "#schemas/User.js"
// importamos el hash para encriptar
 import {hash} from 'bcrypt'
const userRegistrerController = async (req, res) => {
    const { _id ,name, description, email, passwordHash} = req.body

    const exsistingUserByEmail = await UserModel.findById(email).exec()

    if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')    
   // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await  hash(passwordHash, 12) 

   const user = new UserModel({
        _id, 
        name,
        description,
        email, 
        // asignamos la contraseña encriptada
        passwordHash : hashedPassword
    })
    await user.save()

return res.send('usuario registrado con exito')
}



export default userRegistrerController