import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'
import { hash } from 'bcrypt'
import EmpresaModel from "#schemas/empresaSchema.js";


/**
 * 
 * @param {body -> [name(string), email(string), passwordHash(string), description(string) ,rolUser('alumno'), cartaPresentacion('string'), curriculum(buffer), link(string)]} req 
 * @param {*} res 
 * @returns 
 */
export const estudianteRegistrerController = async (req, res) => {
  try {

    req.body.rolUser = 'alumno';
    const { cartaPresentacion, curriculum } = req.body
    const id = await userController.userRegistrerController(req, res)
    console.log('id' + id)
    const estudiante = new EstudianteModel({
      refUser: id,
      cartaPresentacion,
      curriculum
    })
    await estudiante.save()

    return res.status(201).send('estudiante registrado')
  } catch (error) {
    return res.status(404).send('error al registrar estudiante')
  }
}

/**
 * 
 * @param {*} req
 * @param {body -> all info for update estudiante}
 * @param {*} res 
 * @returns 
 */
export const updateEstudianteController = async (req, res) => {
  try {

    // Obtenemos el id del gestor y los datos a actualizar proporcionados
    const data = req.body
    const idUsuario = req.idToken;
          console.log('000000000000000000000')
    if ('rolUser' in data) {
      return res.status(401).send('no puedes modificar tu rol')
    }
          console.log('111111111111111111111')
    // Actualizamos el registro del gestor en la base de datos
    const estudiante = await EstudianteModel.findOneAndUpdate({ refUser: idUsuario }, req.body, { new: true });
           console.log('222222222222222222222222222222' + estudiante)
    const idUser = estudiante.refUser

    if (data.password || data.name || data.email || data.description) {
      if (data.password) {
        data.password = await hash(data.password, 12)
      }
      await UserModel.findByIdAndUpdate(idUser, req.body, { new: true })
    }
          console.log('444444444444444444')
    // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar

    await EstudianteModel.findByIdAndUpdate(idUser, req.body, { new: true })

    // Enviamos un mensaje de éxito
    return res.status(200).send('Datos del estudiante actualizados con éxito')

  } catch (error) {
    console.log(error)
    return res.status(404).send('Error al actualizar los datos')
  }
}


/**
 * ESTE CONTROLLER ES UN GET NO HACE FALTA PASAR INFO A EXCEPCION DEL TOKEN (COMO TODOS)
 * @param {*} req 
 * @param {*} res 
 * lista todas las ofertas(activadas) que hay en la base de datos
 */
export const listarOfertas = async (req, res) => {
  try {
    const ofertas = await OfertaLaboral.find();
    res.send({ ofertas });
  } catch (error) {
    res.status(500).send(error);
  }
}


/**
 * 
 * @param {idOferta(string) } req 
 * @param {*} res 
 */
export const getOfertaSeleccionada = async (req, res) => {
  try {
    const oferta = await OfertaLaboral.findById(req.params.id);
    res.send({ oferta });
  } catch (error) {
    res.status(500).send(error);
  }
}



/**
 * Inscribir al usuario a una oferta, metemos por defecto pendiente
 * @param {body ->  idOferta(string)} req 
 * @param {*} res 
 */
export const inscribirseOferta = async (req, res) => {
  try {

    const { idOferta } = req.body

    const idUsuarioToken = req.idToken;
    if (!idUsuarioToken) {
      res.status(401).send('No tienes los permisos para inscribir a otro usuario')
      return;
    }

    const oferta = await OfertaLaboral.findById(idOferta)
    const inscripcion = new InscripcionModel({
      refUser: idUsuarioToken,
      refOfertaLaboral: idOferta,
      idEmpresa: oferta.idEmpresa,
      estado: "pendiente"
    });
    await inscripcion.save();
    // Realiza alguna acción para inscribir al estudiante a la oferta
    return res.status(200).send({ mensaje: "Estudiante inscrito a la oferta" });
  } catch (error) {
    res.status(500).send(error);
  }
}


/**
 * 
 * @param {idInscripcion(string), idUsuario(string)} req 
 * @param {*} res 
 * @returns 
 */
export const borrarInscripcion = async (req, res) => {
  try {

    // Obtenemos el id de la inscripción a borrar
    const id = req.params.idInscripcion

    const idUsuarioToken = req.idToken;
    const inscripcion = await InscripcionModel.findOne({ _id: id, refUser: idUsuarioToken });
    if (!inscripcion) {
      res.status(401).send('No tienes los permisos para borrar esta inscripción');
      return;
    }
    // Buscamos y borramos la inscripción en la base de datos
    await InscripcionModel.findByIdAndDelete(id)

    // Enviamos una respuesta exitosa al cliente
    res.send({ mensaje: "Inscripción borrada exitosamente" });
  } catch (error) {
    res.status(500).send(error);
  }
}

export const verOfertasInscrito = async (req, res) => {
  try {
    const idUsuarioToken = req.idToken;
    const ofertasInscritas = await InscripcionModel.find({ refUser: idUsuarioToken }).populate("refOfertaLaboral")
    res.send({ ofertasInscritas })
  } catch (error) {
    res.status(500).send('Ha habido un error al mostrar las ofertas en las que estas inscrito')
  }
}   