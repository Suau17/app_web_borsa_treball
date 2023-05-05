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
    if (access != process.env.SecretWord) res.status(498).send(`La clau d'accés és incorrecta.`)
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
      resposta: 'Token enviat com a cookie.'
    }

    return res.status(200).send(msg)
  } catch (error) {
    return res.status(500).send('Error al registrar admininistrador.')
  }
}

export const cicloGetController = async (req, res) => {
  try {

    const estudios = await EstudiosModel.find()

    const msg = {
      estudios,
      resposta: 'Els estudis han sigut recuperats.'
    }

    return res.send(msg)
  } catch (error) {
    return res.send('Error al registrar admininistrador.')
  }
}

export const habilitarGestorController = async (req, res) => {
  const id = req.params.id;
  const perfil = await GestorModel.findOne({ refUser: id });
  let empresa = perfil.nameEmpresa
  const gestores = await GestorModel.find({ nameEmpresa : empresa });

  for (const gestor of gestores) {
    const mailTo = await UserModel.findById(gestor.refUser);
    const newHabilitado = !gestor.perfilHabilitado;

    const gest = await GestorModel.findByIdAndUpdate(
      gestor._id,
      { perfilHabilitado: newHabilitado },
      { new: true }
    );

      console.log(gest)

    // let bodyHTML;
    // if (newHabilitado) {
    //   bodyHTML = `Hola ${mailTo.name}, soy ${console.log('admin')} represento al Vidal i Barraquer y hemos deshabilitado su cuenta de la bolsa de trabajo del Vidal i Barraquer.`;
    // } else {
    //   bodyHTML = `Hola ${mailTo.name}, soy ${console.log('admin')} represento al Vidal i Barraquer y hemos habilitado su cuenta de la bolsa de trabajo del Vidal i Barraquer.`;
    // }

    // Aquí puedes enviar el correo electrónico a "mailTo.email" con el contenido de "bodyHTML"
  }

  return res.status(200).send({ msg: `Dades de ${gestores.length} gestors actualitzats amb èxit.` });
};


export const contarUsuariosEsteAño = async (req, res) => {
  const fechaActual = new Date()
  const añoActual = fechaActual.getFullYear()

  const usuarios = await UserModel.find({
    createdAt: {
      $gte: new Date(añoActual, 0, 1),
      $lt: new Date(añoActual + 1, 0, 1)
    }
  })

  const cantidadUsuarios = usuarios.length

  const msg = {
    data : usuarios,
    msg: `Hi ha ${cantidadUsuarios} usuaris registrats a la base de dades aquest any.`
  }

  res.status(200).send(msg)
}
export const contarOfertasPorCiclo = async (req, res) => {
  try {
    const ofertas = await OfertaLaboral.find()

    const ofertasPorCiclo = {}

    ofertas.forEach((oferta) => {
      const ciclo = oferta.ciclo
      if (ofertasPorCiclo[ciclo]) {
        ofertasPorCiclo[ciclo] += 1
      } else {
        ofertasPorCiclo[ciclo] = 1
      }
    })

    const msg = {
      ofertasPorCiclo
    }

    res.status(200).send(msg)
  } catch (error) {
    res.status(500).send({ error })
  }
}

export const eliminarUsuario = async (req, res) => {
  console.log('dsd')

  const idUsuario = req.body.id
  console.log(idUsuario)
  if (!idUsuario) {
    res.status(401).send('No tens els permissos per a esborrar un altre usuari.')
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
    await GestorModel.deleteOne({ refUser: user._id })
  }
  if (user.rolUser === 'responsable') {
    const empresa = await EmpresaModel.findOne({ empleados: { $in: [user._id] } });

    if (!empresa|| !empresa.empleados.includes(user._id)  || !empresa.empleados.includes(user._id)) {
        res.status(401).send({ msg: 'No gtens els permissos per a actualitzar una oferta de treball en aquesta empresa.' });
        return;
    }

    await empresa.updateOne({ $pull: { empleados: user._id } });
    await GestorModel.deleteOne({ refUser: user._id });
  }


  // Eliminamos el usuario del modelo de usuario
  await UserModel.deleteOne({ _id: idUsuario })
  // Enviamos un código de estado HTTP 200 (OK)
  const msg = {
    msg: 'Usuari eliminat correctament.'
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
      resposta: 'Cicle registrat correctament.'
    }

    return res.status(200).send(msg)
  } catch (error) {
    console.log(error.message)
    return res.status(400).send({ resposta: `S'ha produit un problema al crear el cicle`, error })
  }
}


export const updateAdminController = async (req, res) => {
  try {
      // Obtenemos el id del gestor y los datos a actualizar proporcionados
      const data = req.body
      const idUsuario = req.idToken

      if (!idUsuario) {
          res.status(401).send('No tens els permissos per a esborrar un altre usuari.')
          return;
      }

      if ('rolUser' in data) {
          return res.status(401).send('No pots modificar el teu rol.')
      }
      // Actualizamos el registro del gestor en la base de datos
      const admin = await AdminModel.findOneAndUpdate({ refUser: idUsuario }, req.body, { new: true });

      const idUser = admin.refUser

      if (data.password || data.name || data.email || data.description) {
          if (data.password) {
              data.password = await hash(data.password, 12)
          }
          await UserModel.findByIdAndUpdate(idUser, req.body, { new: true })
      }
      // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar



      // Enviamos un mensaje de éxito
      return res.send('Dades del gestor actualitzades amb èxit.')
  } catch (error) {
      // En caso de error, enviamos un mensaje de error
      return res.status(500).send(`S'ha produit un error inesperat. Intenta-ho de nou més endavant.`)
  }
}