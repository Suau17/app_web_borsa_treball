import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
import fs from 'fs';
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'
import { hash } from 'bcrypt'
import multer from 'multer'
import * as path from 'path';
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
    console.log(cb.fieldname)
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
})
const upload = multer({ storage: storage })


export const estudianteRegistrerController = async (req, res) => {
  upload.single('curriculum', 5)(req, res, async () => {
    const { cartaPresentacion, link } = req.body;
    if(!link) link = ''
    req.body.rolUser = 'alumno';
    let estudis = req.body.estudis;
    const { id, token } = await userController.userRegistrerController(req, res);
    console.log('id' + id);
    const estudianteData = {
      refUser: id,
      cartaPresentacion,
      estudis,
      link
    };
    if (req.file) {
      estudianteData.curriculum = req.file.filename;
    }
    const estudiante = new EstudianteModel(estudianteData);
    await estudiante.save();
    const msg = {
      token: token,
      role: 'alumno',
      id,
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

  const filePath = path.join('.', 'uploads', estudiante.curriculum);
  console.log()
  return res.download(filePath, err => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error al descargar el currículum');
    }
  });
};

/**
 * 
 * @param {*} req
 * @param {body -> all info for update estudiante}
 * @param {*} res 
 * @returns 
 */

//mirar si faltan campos

export const updateEstudianteController = async (req, res) => {
  upload.single('curriculum', 5)(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    const { cartaPresentacion, estudi, link } = req.body;
    const id = req.idToken;

    if (typeof cartaPresentacion !== 'string' || cartaPresentacion.trim() === '') {
      return res.status(400).send('El campo "cartaPresentacion" es inválido');
    }
    
  
    if (!link) {
      return res.status(400).send('Falta el campo "link"');
    }

    let estudiante = await EstudianteModel.findOne({ refUser: id });
    if (!estudiante) {
      return res.status(404).send('Estudiante no encontrado');
    }

    if (estudiante.curriculum) {
      const currPath = path.join('./uploads/', estudiante.curriculum);
      console.log(currPath)
      fs.unlink(currPath, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Currículum anterior eliminado');
      });
    }

    if (req.file) {
      console.log(req.file.filename + 'afaff')
      estudiante.curriculum = req.file.filename;
    }

    estudiante.cartaPresentacion = cartaPresentacion;
    estudiante.estudis = estudis;
    estudiante.link = link;

    await estudiante.save();
    return res.send('Estudiante actualizado correctamente');
  });
};





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

    // Comprobar que el estudiante no tenga inscripción en la misma oferta

    const oferta = await OfertaLaboral.findById(idOferta)
    const inscripcionrepetida = await InscripcionModel.findOne({ refOfertaLaboral: idOferta, refUser: idUsuarioToken });




    if (inscripcionrepetida) {

    if(inscripcionrepetida.estado === 'aceptado' || inscripcionrepetida.estado === 'rechazado'){
      res.status(401).send({msg: 'La empresa ya ha gestionat la teva inscripció així que no pots borrar la inscripció'});
      return;      
    }

      await InscripcionModel.deleteOne({ refOfertaLaboral: idOferta, refUser: idUsuarioToken });
      res.status(401).send({msg: 'Ya se ha borrado la inscripcion de la oferta.'});
      return;      
    }

    let expirationDate = oferta.expirationDate
    let timestampExpirationDate = new Date(expirationDate).getTime();
    let timestampActual = new Date().getTime()
    
    if(timestampActual > timestampExpirationDate){ 
      console.log('NO')
      res.status(403).send({msg: 'oferta caducada'});
      return
    }

    // PARA REVISAR

    const inscripcion = new InscripcionModel({
      refUser: idUsuarioToken,
      refOfertaLaboral: idOferta,
      idEmpresa: oferta.idEmpresa,
      estado: "pendiente"
    });
    console.log(inscripcion)
    await OfertaLaboral.findOneAndUpdate(
      { _id: idOferta },
      { $push: { refUsersInscritos: idUsuarioToken } }
    )
    const data = await inscripcion.save();
    // Realiza alguna acción para inscribir al estudiante a la oferta
    const msg = { msg: "Estudiante inscrito a la oferta" , data} 
    return res.status(200).send(msg);
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
    console.log(ofertasInscritas)
    res.send({ ofertasInscritas })
  } catch (error) {
    res.status(500).send('Ha habido un error al mostrar las ofertas en las que estas inscrito')
  }
}   