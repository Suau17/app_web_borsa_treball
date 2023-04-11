import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'
import { hash } from 'bcrypt'
import multer from 'multer'
import EmpresaModel from "#schemas/empresaSchema.js";


/**
 * 
 * @param {body -> [name(string), email(string), passwordHash(string), description(string) ,rolUser('alumno'), cartaPresentacion('string'), curriculum(buffer), link(string)]} req 
 * @param {*} res 
 * @returns 
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })


export const estudianteRegistrerController = async (req, res) => {
  upload.single('curriculum', 5)(req, res, async () => {
    const { cartaPresentacion } = req.body;
    const curriculum = req.file.buffer;
    req.body.rolUser = 'alumno';
    let estudis = req.body.estudis;
    const { id, token } = await userController.userRegistrerController(req, res);
    console.log('id' + id);
    const estudiante = new EstudianteModel({
      refUser: id,
      cartaPresentacion,
      estudis
    });
    await estudiante.save();
    const msg = {
      token: token,
      role: 'alumno',
      resposta: 'Token enviado como cookie'
    };
    return res.send(msg);
  });
};

export const downloadCurriculumController = async (req, res) => {
  const { id } = req.params;
  const estudiante = await EstudianteModel.findById(id);

  if (!estudiante || !estudiante.curriculum) {
    return res.status(404).send('El currículum no se encuentra');
  }

  res.set('Content-Type', estudiante.curriculum.contentType);
  res.set('Content-Disposition', `attachment; filename=${estudiante.curriculum.filename}`);

  return res.send(estudiante.curriculumFile.data);
};

/**
 * 
 * @param {*} req
 * @param {body -> all info for update estudiante}
 * @param {*} res 
 * @returns 
 */
export const updateEstudianteController = async (req, res) => {

  // Obtenemos el id del gestor y los datos a actualizar proporcionados
  const data = req.body
  const idUsuario = req.idToken;

  if (!idUsuario) {
    res.status(401).send('No tienes los permisos para actualizar o cambiar informacion de otro usuario')
    return;
  }

  if ('rolUser' in data) {
    return res.status(401).send('no puedes modificar tu rol')
  }

  // Actualizamos el registro del gestor en la base de datos
  const estudiante = await EstudianteModel.findOneAndUpdate({ refUser: idUsuario }, req.body, { new: true });

  const idUser = estudiante.refUser

  if (data.password || data.name || data.email || data.description) {
    if (data.password) {
      data.password = await hash(data.password, 12)
    }
    await UserModel.findByIdAndUpdate(idUser, req.body, { new: true })
  }
  // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar



  // Enviamos un mensaje de éxito
  return res.send('Datos del estudiante actualizados con éxito')

}


/**
 * ESTE CONTROLLER ES UN GET NO HACE FALTA PASAR INFO A EXCEPCION DEL TOKEN (COMO TODOS)
 * @param {*} req 
 * @param {*} res 
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
export const verOferta = async (req, res) => {
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
    // Comprobar que el estudiante no tenga inscripción en la misma oferta
    const oferta = await OfertaLaboral.findById(idOferta)

    // PARA REVISAR
    const inscripcionrepetida = await InscripcionModel.findOne({ refOfertaLaboral: idOferta, refUser: idUsuarioToken });
    console.log(inscripcionrepetida)
    if (inscripcionrepetida) {
      res.status(401).send('Ya estás inscrito en esta oferta.');
      return;
    }

    const inscripcion = new InscripcionModel({
      refUser: idUsuarioToken,
      refOfertaLaboral: idOferta,
      idEmpresa: oferta.idEmpresa,
      estado: "pendiente"
    });
    await OfertaLaboral.findOneAndUpdate(
      { _id: idOferta },
      { $push: { refUsersInscritos: idUsuarioToken } }
    )
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
    //PARA REVISAR
    const inscripcion = await InscripcionModel.findOne({ refOfertaLaboral: id, refUser: idUsuarioToken });
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