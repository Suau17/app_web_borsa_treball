import UserModel from "#schemas/User.js"
// importamos el hash para encriptar
import { hash, compare } from 'bcrypt'


export const userRegistrerController = async (req, res) => {
    const { _id, name, description, email, passwordHash, rolUser } = req.body

    const exsistingUserByEmail = await UserModel.findById(email).exec()

    if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')
    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        _id,
        name,
        description,
        email,
        // asignamos la contraseña encriptada
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()

    return res.send('usuario registrado con exito')         
      
    
}


export const userLoginController = async (req, res) => {
    const { email, password } = req.body

    // comprobamos que el email exsiste en la DB
    const exsistingUserByEmail = await UserModel.findOne({ email }).exec()
    if (!exsistingUserByEmail) return res.status(401).send('incorrect credentials')

    const checkPassword = await compare(password, exsistingUserByEmail.passwordHash);

    if (!checkPassword) return res.status(401).send('incorrect credentials')
}


export const getUsersControllers = (req, res) => {
    
    UserModel.find().exec(function async (err, list_users) {
        if (err) {
            return next(err);
        }
        // en la view saldara una var con json list_users
      //res.send({ listaUsuarios: list_users })
      
       
            // 'await' espera a que trobi les dades de Genere. Amb 'await' es obligat posar 'async' a la
            // definició del mètode. El 'await' sempre ha d'estar entre un 'try-catch'
            
      res.render('usersViews/list',{listaUsuarios: list_users})   
          
        
    })

    
}

