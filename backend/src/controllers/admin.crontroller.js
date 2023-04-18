import AdminModel from "#schemas/admin.js"
import * as userController from '#controllers/user.controller.js'
import UserModel from "#schemas/User.js"
import GestorModel from "#schemas/Gestor.js"
import EmpresaModel from "#schemas/empresaSchema.js"
import InscripcionModel from "#schemas/inscripcion.js"
import EstudianteModel from "#schemas/estudiante.js"
import OfertaLaboral from "#schemas/ofertaLaboral.js"
import EstudiosModel from "#schemas/estudios.schema.js"
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inscribirseOferta } from "./estudiantes.controller.js"

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

export const cicloGetController = async (req, res) => {
  try {
   
    const estudios = await EstudiosModel.find()

    const msg = {
         estudios,
         resposta: 'Estudios han sido recuperados'
       }
 
     return res.send(msg)
   } catch (error) {
   return res.send('error al registrar admin')
   }
 }

export const habilitarGestorController = async (req, res) => {
 

    // Obtenemos el id del gestor y los datos a actualizar proporcionados
    const id = req.params.id
    console.log(id)
    // Actualizamos el registro del gestor en la base de datos
  const gestor =  await GestorModel.findOneAndUpdate({refUser : id}, { perfilHabilitado: true }, { new: true })
  console.log(gestor)
    // Enviamos un mensaje de éxito
    return res.status(200).send({msg :'Datos del gestor actualizados con éxito'})
  
}

const dataYear = async () => {
  const ofertas = database.collection("ofertalaborals");

  // Estimate the total number of documents in the collection

  // and print out the count.

  const estimate = await ofertas.estimatedDocumentCount();
  console.log(estimate)
}

export const eliminarUsuario = async (req,res)=> {
  console.log('dsd')

  const idUsuario = req.body.id
  console.log(idUsuario)
  if (!idUsuario) {
    res.status(401).send('No tienes los permisos para borrar otro usuario')
    return;
  }
  const user = await UserModel.findById(idUsuario)


  // Si el rol del usuario es "alumno", eliminamos el documento del modelo de estudiante
  // if(user.rolUser === 'admin'){
  //   await UserModel.deleteOne({refUser: idUsuario})
  // }
  if (user.rolUser === 'alumno') {
    await EstudianteModel.deleteOne({ refUser: idUsuario })
    await InscripcionModel.deleteMany({ refUser: idUsuario })
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
  await UserModel.deleteOne({ _id: idUsuario  })
  // Enviamos un código de estado HTTP 200 (OK)
  const msg = {
    msg : 'usuario eliminado correctament'
}
res.status(200).send(msg)
}



export const cicloRegistrerController = async (req, res) => {
  try {
    


     const { name, familiaProfesional, durada, asignatures } = req.body
 
       const ciclo = new EstudiosModel({
        name,
        familiaProfesional,
        durada,
        asignatures
       })
       await ciclo.save()
      const msg = {
         resposta: 'Ciclo registrado correctamente'
       }
 
     return res.status(200).send(msg)
    } catch (error) {
      return res.status(400).send({resposta:'Ha habido un problema al crear el ciclo', error})
    }
 }
