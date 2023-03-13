import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'
import { hash} from 'bcrypt'
import multer from 'multer'
import EmpresaModel from "#schemas/empresaSchema.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // límite de tamaño de archivo de 3MB
  },
});
/**
 * 
 * @param {body -> [name(string), email(string), passwordHash(string), description(string) ,rolUser('alumno'), cartaPresentacion('string'), curriculum(buffer), link(string)]} req 
 * @param {*} res 
 * @returns 
 */
export const estudianteRegistrerController = async (req, res) => {
  // procesar el formulario con multer
  upload.single('curriculum')(req, res, async (err) => {
    if (err) {
      // si hay un error en el archivo, enviar una respuesta de error
      return res.status(400).send({ error: 'Error al cargar el archivo' });
    }

    const { cartaPresentacion } = req.body;
    const curriculum = req.file.buffer; // obtener el archivo del objeto de solicitud

    req.body.rolUser = 'alumno';
    let estudis = req.body.estudis;
    
    const { id, token } = await userController.userRegistrerController(req, res);
    console.log('id' + id);
    const estudiante = new EstudianteModel({
      refUser: id,
      cartaPresentacion,
      //curriculum,
      estudis
    });
    await estudiante.save();
    const msg = {
      token : token,
      role : 'alumno',
      resposta : 'Token enviado como cookie'
    };
    console.log('AAA')
    console.log(msg)
    return res.send(msg);
  });
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
    //Comprobar que el estudiante no tenga inscripción en la misma oferta
    const oferta = await OfertaLaboral.findById(idOferta)

    //PARA REVISAR
    const inscripcionrepetida = await InscripcionModel.findOne({ refOfertaLaboral: id, refUser: idUsuarioToken });
    if (!inscripcionrepetida) {
      res.status(401).send('Ya estás inscrito en esta oferta.');
      return;
    }
    
    const inscripcion = new InscripcionModel({
      refUser: idUsuarioToken,
      refOfertaLaboral: idOferta,
      idEmpresa : oferta.idEmpresa,
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