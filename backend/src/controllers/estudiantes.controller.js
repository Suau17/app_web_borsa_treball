import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import EstudianteModel from "#schemas/estudiante.js"
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