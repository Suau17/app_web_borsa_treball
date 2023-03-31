import AdminModel from "#schemas/admin.js"
import * as userController from '#controllers/user.controller.js'
import UserModel from "#schemas/User.js"
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminRegistrerController = async (req, res) => {
 try {
  

    let msg;
    const { carrec, telefon, dni, access } = req.body
    if (access != process.env.SecretWord) res.status(498).send('la clave de acceso es incorrecta')
    req.body.rolUser = 'admin';
    const { id, token } = await userController.userRegistrerController(req, res)
    req.idToken = id


      const admin = new AdminModel({
        carrec,
        telefon,
        dni,
        refUser: id,
      })
      await admin.save()
      console.log(token)
      msg = {
        token: token,
        role: 'admin',
        resposta: 'Token enviado como cookie'
      }

    return res.send(msg)
  } catch (error) {
  return res.send('error al registrar admin')
  }
}

export const habilitarGestorController = async (req, res) => {
  try {
    // Obtenemos el id del gestor y los datos a actualizar proporcionados
    const id = req.params.id
    console.log(id)
    // Actualizamos el registro del gestor en la base de datos
    await GestorModel.findByIdAndUpdate(id, { perfilHabilitado: true }, { new: true })

    // Enviamos un mensaje de éxito
    return res.send('Datos del gestor actualizados con éxito')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
  }
}
const dataYear = async () => {
  const ofertas = database.collection("ofertalaborals");

  // Estimate the total number of documents in the collection

  // and print out the count.

  const estimate = await ofertas.estimatedDocumentCount();
  console.log(estimate)
}

export const eliminarUsuario = async (req,res)=> {

try {
  const idUsuario = req.body.id
  if (!idUsuario) {
    res.status(401).send('No tienes los permisos para borrar otro usuario')
    return;
  }
  const user = await UserModel.findById(idUsuario)


  // Si el rol del usuario es "alumno", eliminamos el documento del modelo de estudiante
  if (user.rolUser === 'alumno') {
    await EstudianteModel.deleteOne({ refUser: idUsuario })
  }
  if (user.rolUser === 'gestor') {
    const gestor = await GestorModel.findOne({ refUser: idUsuario })
    console.log(gestor)
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
  res.status(200).send('Usuario eliminado correctamente')
} catch (error) {
  // En caso de error, enviamos un código de estado HTTP 500 (Internal Server Error)
  res.status(500).send('error')
}
}
