import UserModel from "#schemas/User.js"
// importamos el hash para encriptar
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'


export const userRegistrerController = async (req, res) => {
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
    
    return res.redirect('/user/getUsers')         
      
    
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
        username : exsistingUserByEmail.name,
        role : exsistingUserByEmail.rolUser
    }

    const token = jwt.sign(userForToken, process.env.SecretWord, {expiresIn: '1h'} )
    res.cookie("tokenAcces", token);
    return res.status(201).send('cookie creada')

    //implementar parte visual

    // res.render('usersView/list',{listaUsuarios: list_users}) 
    //return res.redirect('/user/login')
   // return res.status(200).send(token)

}


export const getUsersControllers = (req, res) => {

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

export const deleteUserController = async (req, res) => {
    /*  
   try {
       const oferta = await OfertaLaboral.findById(req.params.id)
       res.send({ data:oferta })
   } catch (error) {
       res.status(404).send({message: `error al borrar el producto ${err}`})
   }
   
   */
       
       let userId = req.params.userId
       UserModel.findById(userId, (err, UserModel) => {
   
           if(err) return res.status(500).send({message: `error al borrar el usuario ${err}`})
            
           UserModel.delete(err => {
           if(err) res.status(500).send({message: `error al borrar el usuario ${err}`})
           //res.status(200).send({message:`el usuario ha sido eliminado`})
           return res.redirect('/user/getUsers')
           
       }) 
      
       })
   
   
   }
   export const updateController = async (req, res) => {
    let id = req.params.id

    const user = await UserModel.findById(id)
   // res.send({oferta:oferta})
    res.render('usersView/update',{user: user})  

  
    
}
   export const updateUserController = async (req, res) => {
    try {
        let id = req.params.id

        const user = await UserModel.findById(id)
        Object.assign(user, req.body)
        user.save()
        //res.status(200).send({error: "UPDATE"})
        return res.redirect('/user/getUsers')
    } catch (error) {
        res.status(404).send({error: "ERROR UPDATE"})
    }
    
}

export const userDeleteControllers = (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
  }

