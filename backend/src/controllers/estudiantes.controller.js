import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'




export const estudianteRegistrerController = async (req, res) => {
  const {cartaPresentacion, curriculum } = req.body

  const id = await userController.userRegistrerController(req,res)
  console.log('id'+id)
  const estudiante = new EstudianteModel({
    refUser: id,
    cartaPresentacion,
    curriculum
  })
  await estudiante.save()

  return res.send('estudiante registrado')


}

export const updateEstudianteController = async (req, res) => {

      // Obtenemos el id del gestor y los datos a actualizar proporcionados
      const id = req.params.id
      const data = req.body

      if ('rolUser' in data) {
          return res.status(401).send('no puedes modificar tu rol')
      }

      // Actualizamos el registro del gestor en la base de datos
      const estudiante = await EstudianteModel.findOneAndUpdate({refUser:id}, req.body, { new: true });
      
      const idUser = estudiante.refUser

      if(data.password || data.name || data.email || data.description){
          if (data.password) {
              data.password = await hash(data.password, 12)
          }
          await UserModel.findByIdAndUpdate(idUser, req.body, { new: true })
      }
      // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar

      
      
      // Enviamos un mensaje de éxito
      return res.send('Datos del estudiante actualizados con éxito')

  }

export const listarOfertas = async (req, res) => {
    try {
      const ofertas = await OfertaLaboral.find();
      res.send({ ofertas });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  export const verOferta = async (req, res) => {
    try {
      const oferta = await OfertaLaboral.findById(req.params.id);
      res.send({ oferta });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  export const inscribirseOferta = async (req, res) => {
    try {
    const {idUsuario, idOferta} = req.body
    const inscripcion = new InscripcionModel({
        refUser: idUsuario,
        refOfertaLaboral: idOferta,
        estado: "pendiente"
      });
    await inscripcion.save();
      // Realiza alguna acción para inscribir al estudiante a la oferta
      res.send({ mensaje: "Estudiante inscrito a la oferta" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  export const borrarInscripcion = async (req, res) => {
    try {
        // Obtenemos el id de la inscripción a borrar
        const id = req.params.idInscripcion

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
      const ofertasInscritas = await InscripcionModel.find({  refUser: req.params.id }).populate("refOfertaLaboral")
      res.send({ ofertasInscritas })
    } catch (error) {
      res.status(500).send('Ha habido un error al mostrar las ofertas en las que estas inscrito')
    }
  }   