import UserModel from "#schemas/User.js"
import EstudianteModel from "#schemas/estudiante.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import OfertaLaboral from "#schemas/ofertaLaboral.js"
import InscripcionModel from '#schemas/inscripcion.js'


import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken';



export const userRegistrerController = async (req, res) => {
  const { name, email, passwordHash, rolUser } = req.body

  const exsistingUserByEmail = await UserModel.findOne({ email })

  if (exsistingUserByEmail) return res.status(499).send('ya exsiste un usuario con ese email registrado')
  const hashedPassword = await hash(passwordHash, 12)

  const user = new UserModel({
    name,
    email,
    passwordHash: hashedPassword,
    rolUser
  })
  await user.save()

  return user._id

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
    token : token,
    resposta : 'Token enviado como cookie'
  }
  res.send(msg);
}


export const getUsersControllers = (req, res) => {
  UserModel.find().exec(function async(err, listUsers, next) {
    if (err) {
      return next(err)
    }
    res.send({ listaUsuarios: listUsers })
  })
}


export const deleteUserController = async (req, res) => {
  try {
    const { userId: id } = req.params

    const user = await UserModel.findById(id)

    // Si el rol del usuario es "alumno", eliminamos el documento del modelo de estudiante
    if (user.rolUser === 'alumno') {
      await EstudianteModel.deleteOne({ refUser: id })
    }
    if (user.rolUser === 'gestor') {
      const gestor = await GestorModel.findOne({ refUser: id })
      console.log(gestor)
      if (gestor.refEmpresa) {
        const empresaId = gestor.refEmpresa;
        // Borramos todas las ofertas de la empresa
        await InscripcionModel.deleteMany({ idEmpresa: id })
        await OfertaLaboral.deleteMany({ idEmpresa: empresaId });
        await EmpresaModel.deleteOne({ refUser: id });
      }

      await GestorModel.deleteOne({ refUser: id })
    }
    if (user.rolUser === 'responsable') {
      await GestorModel.deleteOne({ refUser: id })
    }

    // Eliminamos el usuario del modelo de usuario
    await UserModel.deleteOne({ _id: id })

    // Enviamos un código de estado HTTP 200 (OK)
    res.status(200).send('Usuario eliminado correctamente')
  } catch (error) {
    // En caso de error, enviamos un código de estado HTTP 500 (Internal Server Error)
    res.status(500).send('error')
  }
}


export const infoUser = async (req, res) => {
  try {
    // Obtenemos el id del usuario proporcionado
    const id = req.params.id
    console.log(id)
    // Buscamos el documento del usuario en la base de datos
    const user = await UserModel.findById(id)
    console.log(user)
    // Inicializamos un objeto vacío para guardar la información que queremos enviar
    const data = {}

    if (user.rolUser === 'alumno') {
      const estudiante = await EstudianteModel.findOne({ refUser: id })
      data.estudiante = estudiante
    }
    if (user.rolUser === 'gestor') {
      const gestor = await GestorModel.findOne({ refUser: id })
      data.gestor = gestor
      if (gestor.refEmpresa) {
        const empresaId = gestor.refEmpresa;

        const ofertas = await OfertaLaboral.find({ idEmpresa: empresaId });
        data.ofertas = ofertas

        const empresa = await EmpresaModel.findOne({ refUser: id });
        data.empresa = empresa
      }
    }
    if (user.rolUser === 'responsable') {
      //  const responsable = await ResponsableModel.findOne({ refUser: id })
      // data.responsable = responsable
    }

    data.user = user;

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send('error' + error)
  }
}

export const updateController = async (req, res) => {
  const id = req.params.id

  const user = await UserModel.findById(id)
  // res.send({oferta:oferta})
  res.render('usersView/update', { user })

}

