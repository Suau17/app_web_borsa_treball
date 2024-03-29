import UserModel from "#schemas/User.js"
import EstudianteModel from "#schemas/estudiante.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import OfertaLaboral from "#schemas/ofertaLaboral.js"
import InscripcionModel from '#schemas/inscripcion.js'


import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken';



export const userRegistrerController = async (req, res) => {
  try {
    const { name, email, passwordHash, rolUser, description } = req.body
    const exsistingUserByEmail = await UserModel.findOne({ email })
    if (exsistingUserByEmail) return { id: false }

    const hashedPassword = await hash(passwordHash, 12)

    const user = new UserModel({
      name,
      email,
      description,
      passwordHash: hashedPassword,
      rolUser: rolUser,
    })
    await user.save()

    const userForToken = {
      id: user._id,
      role: rolUser
    }
    const token = jwt.sign(userForToken, process.env.SecretWord, { expiresIn: '23h' })
    return { id: user._id, token: token }

  } catch (error) {
    return error
  }

}


export const userLoginController = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  if (!email || !password) return res.sendStatus(400)

  // le pasamos incorrect credentials para que si intentan robar una cuenta no sepa si ha acertado con mail o password
  const exsistingUserByEmail = await UserModel.findOne({ email }).exec()
  if (!exsistingUserByEmail) return res.status(401).send('incorrect credentials')

  const checkPassword = await compare(password, exsistingUserByEmail.passwordHash)
  if (!checkPassword) return res.status(401).send('incorrect credentials')

  const userForToken = {
    id: exsistingUserByEmail._id,
    role: exsistingUserByEmail.rolUser
  }

  const token = jwt.sign(userForToken, process.env.SecretWord, { expiresIn: '23h' })
  res.cookie("tokenAcces", token, { httpOnly: true });
  const msg = {
    token: token,
    role: exsistingUserByEmail.rolUser,
    id : exsistingUserByEmail._id,
    resposta: 'Token enviat com a cookie.'
  }
  res.send(msg);
}


export const getUsersControllers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const listUsers = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const listaUsuarios = await Promise.all(listUsers.map(async (user) => {
      if (user.rolUser === "gestor") {
        const gestor = await GestorModel.findOne({ refUser: user._id });
        if (gestor && gestor.perfilHabilitado) {
          user.description = true
        }
      }
      return user.toObject();
    }));
    
    res.status(200).send({ listaUsuarios });
  } catch (error) {
    res.status(500).send({error});
  }
}

export const searchUser = async (req, res) => {
  const id = req.params.id
  const user = await UserModel.findById(id)
  let msg = {
    user: user
  }
  if(user.rolUser === 'alumno'){
    let alumno = await EstudianteModel.find({refUser:id})
    msg.alumno = alumno
  }

  res.status(201).send(msg)
}

export const deleteUserController = async (req, res) => {
  try {
    const idUsuario = req.idToken;
    if (!idUsuario) {
      res.status(401).send('No tens els permissos per a esborrar un altre usuari.')
      return;
    }
    const user = await UserModel.findById(idUsuario)


    // Si el rol del usuario es "alumno", eliminamos el documento del modelo de estudiante
    if (user.rolUser === 'alumno') {
      await EstudianteModel.deleteOne({ refUser: idUsuario })
    }
    if (user.rolUser === 'gestor') {
      const gestor = await GestorModel.findOne({ refUser: idUsuario })
      if (gestor.refEmpresa) {
        const empresaId = gestor.refEmpresa;
        // Borramos todas las ofertas de la empresa
        await InscripcionModel.deleteMany({ idEmpresa: empresaId })
        await OfertaLaboral.deleteMany({ idEmpresa: empresaId });
        await EmpresaModel.deleteOne({ refUser: user._id });
      }

      await GestorModel.deleteOne({ refUser: idUsuario })
    }


    // Eliminamos el usuario del modelo de usuario
    await UserModel.deleteOne({ _id: idUsuario })

    // Enviamos un código de estado HTTP 200 (OK)
    res.status(200).send({msg:'Usuari eliminat correctament.'})
  } catch (error) {
    // En caso de error, enviamos un código de estado HTTP 500 (Internal Server Error)
    res.status(500).send('error')
  }
}


export const infoUser = async (req, res) => {
  try {
    // Obtenemos el id del usuario proporcionado

    const idUsuario = req.idToken;

    if (!idUsuario) {
      res.status(401).send(`No tens els permissos per a obtenir informació d'un altre usuari.`)
      return;
    }
    // Buscamos el documento del usuario en la base de datos
    const user = await UserModel.findById(idUsuario)
    console.log(user)
    // Inicializamos un objeto vacío para guardar la información que queremos enviar
    const data = {}

    if (user.rolUser === 'alumno') {
      const estudiante = await EstudianteModel.findOne({ refUser: idUsuario })
      data.estudiante = estudiante
    }
    
    if (user.rolUser === 'gestor') {
      const gestor = await GestorModel.findOne({ refUser: idUsuario })
      data.gestor = gestor
      if (gestor.refEmpresa) {
        const empresaId = gestor.refEmpresa;

        const ofertas = await OfertaLaboral.find({ idEmpresa: empresaId });
        data.ofertas = ofertas

        const empresa = await EmpresaModel.findOne({ refUser: idUsuario });
        data.empresa = empresa
      }
    }

    data.user = user;
    const msg = {
      data: data,
      resposta: `Informació d'usuari recuperada`
    }
    res.status(200).send(msg)
  } catch (error) {
    res.status(500).send('error' + error)
  }
}



