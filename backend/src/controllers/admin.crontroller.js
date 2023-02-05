import GestorModel from "#schemas/Gestor.js"
import UserModel from "#schemas/User.js"
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'



export const habilitarGestorController = async (req, res) => {
    try {
        // Obtenemos el id del gestor y los datos a actualizar proporcionados
        const id = req.params.id
        console.log(id)
      // Actualizamos el registro del gestor en la base de datos
        await GestorModel.findByIdAndUpdate(id, {perfilHabilitado : true}, { new: true })
        
        // Enviamos un mensaje de éxito
        return res.send('Datos del gestor actualizados con éxito')
      } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
      }
    }
const ofertasRegistradasEsteAño = async  () => {
    const ofertas = database.collection("ofertalaborals");

    // Estimate the total number of documents in the collection

    // and print out the count.

    const estimate = await ofertas.estimatedDocumentCount();
    console.log(estimate)
}


