import UserModel from "#schemas/User.js"
// importamos el hash para encriptar
 import {hash} from 'bcrypt'


export const userRegistrerController = async (req, res) => {
    const { _id ,name, description, email, passwordHash, rolUser} = req.body

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
        passwordHash : hashedPassword,
        rolUser
    })
    await user.save()

return res.send('usuario registrado con exito')
}

/*
 exportconst userLoginController = async (req, res) => {
    const {_id, email, passwordHash} = req.body

    // comprobamos que el email exsiste en la DB
    const exsistingUserByEmail = await UserModel.findById(email).exec()
    if (!exsistingUserByEmail) return res.status(499).send('este email/usuario no esta registrado')  
    
} */
 

export const getUsersControllers =  (req, res) => {
  
    const total =  UserModel.find().exec(function (err, list_users) {
        if (err) {
            return next(err);
        }
        res.send( {listaUsuarios: list_users} )
    })
}

