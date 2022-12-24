import UserModel from "#schemas/User.js"
import EstudianteModel from "#schemas/estudiante.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"

// importamos el hash para encriptar
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv'


export const userRegistrerController = async (req, res) => {
    const { name, email, passwordHash, rolUser } = req.body

    const exsistingUserByEmail = await UserModel.findOne({email : email})

    if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')
    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        name,
        email,
        // asignamos la contraseña encriptada
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()
    
    return res.redirect('/user/getUsers')         
      
    
}

export const estudianteRegistrerController = async (req, res) => {
    const { name, email, passwordHash, rolUser, refUser, cartaPresentacion, curriculum } = req.body

    const exsistingUserByEmail = await UserModel.findOne({email : email})

    if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')
    // cogemos la variable que viene del req.body y la encriptamos
    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
        name,
        email,
        passwordHash: hashedPassword,
        rolUser
    })
    await user.save()
    const estudiante = new EstudianteModel({
        refUser: user._id,
        cartaPresentacion,
        curriculum
    })
    await estudiante.save()

    return res.send('estudiante registrado')         
      
    
}

export const userLoginController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.sendStatus(400)

    // comprobamos que el email exsiste en la DB
    const exsistingUserByEmail = await UserModel.findOne({ email }).exec()
    if (!exsistingUserByEmail) return res.status(401).send('incorrect credentials')

    const checkPassword = await compare(password, exsistingUserByEmail.passwordHash)
    if (!checkPassword) return res.status(401).send('incorrect credentials')

    const userForToken = {
        id: exsistingUserByEmail._id,
        role : exsistingUserByEmail.rolUser
    }

    const token = jwt.sign(userForToken, process.env.SecretWord, {expiresIn: '1h'} )
    res.cookie("tokenAcces", token);
    return res.status(201).send('cookie creada')

    // implementar parte visual

    // res.render('usersView/list',{listaUsuarios: list_users}) 
    // return res.redirect('/user/login')
   // return res.status(200).send(token)

}


export const getUsersControllers = (req, res) => {

    UserModel.find().exec(function async (err, list_users, next) {
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

export const deleteUserController = async (req, res) => {
    try {
      // Obtenemos el id del usuario proporcionado
      const { userId: id } = req.params
  
        // pendiente de implementar el remove para borrar todo en cascada

      // Buscamos el documento del usuario en la base de datos
      const user = await UserModel.findById(id)
  
      // Si el rol del usuario es "alumno", eliminamos el documento del modelo de estudiante
      if (user.rolUser === 'alumno') {
        await EstudianteModel.deleteOne({ refUser: id })
      }
      if (user.rolUser === 'gestor') {
        await EmpresaModel.deleteOne({ refUser: id })
        await GestorModel.deleteOne({ refUser: id })
      }
      if (user.rolUser === 'responsable') {
        await GestorModel.deleteOne({ refUser: id })
      }
  
      // Eliminamos el usuario del modelo de usuario
      await UserModel.deleteOne({ _id: id })
  
      // Enviamos un código de estado HTTP 200 (OK)
      res.sendStatus(200)
    } catch (error) {
      // En caso de error, enviamos un código de estado HTTP 500 (Internal Server Error)
      res.sendStatus(500)
    }
  }

  
   export const updateController = async (req, res) => {
    const id = req.params.id

    const user = await UserModel.findById(id)
   // res.send({oferta:oferta})
    res.render('usersView/update',{user: user})  

  
    
}
   export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id

        const user = await UserModel.findById(id)
        Object.assign(user, req.body)
        user.save()
        // res.status(200).send({error: "UPDATE"})
        return res.redirect('/user/getUsers')
    } catch (error) {
        res.status(404).send({error: "ERROR UPDATE"})
    }
    
}

export const userDeleteControllers = (req, res, next) => {
    const userId = req.params.id;
    UserModel.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
  }

