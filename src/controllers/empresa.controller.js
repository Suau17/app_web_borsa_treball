import empresasModel from "#schemas/User.js"
// importamos el hash para encriptar
import { hash, compare } from 'bcrypt'

export const empresaRegistrerController = async (req, res) => {
    const { name, description, email, passwordHash, rolUser } = req.body

    const exsistingUserByEmail = await UserModel.findOne({email : email})

    if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')
    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        name,
        description,
        email,
        // asignamos la contraseña encriptada
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()
    S
    return res.redirect('/empresa/getEmpresa')         
      
    
}

export const getEmpresaControllers = (req, res) => {

    UserModel.find().exec(function async (err, list_users) {
        if (err) {
            return next(err)
        }
        // en la view saldara una var con json list_users
       // res.send({ listaUsuarios: list_users })
      
       
            // 'await' espera a que trobi les dades de Genere. Amb 'await' es obligat posar 'async' a la
            // definició del mètode. El 'await' sempre ha d'estar entre un 'try-catch'
            
            // error path join
         res.render('usersView/list',{listaUsuarios: list_users})   
          
        
    })    
}