import OfertaLaboral from "#schemas/ofertaLaboral.js";
import InscripcionModel from "#schemas/inscripcion.js";
import jwt from 'jsonwebtoken';


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
    const idUsuario = req.params.idUsuario;
    const idOferta = req.params.idOferta;  
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