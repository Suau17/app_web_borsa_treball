import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import OfertaLaboral from '#schemas/ofertaLaboral.js'
import InscripcionModel from '#schemas/inscripcion.js'

import * as userController from '#controllers/user.controller.js'
import {sendMail} from '#Lib/email.js'
import UserModel from '#schemas/User.js'



// Recuperar todas las empresas
export const getEmpresaControllers = async (req, res) => {
  try {
    // Obtener todas las empresas de la base de datos
    const empresas = await EmpresaModel.find();

    // Enviar las empresas en la respuesta
    res.send(empresas);
  } catch (error) {
    res.status(500).send('Ocurrió un error al recuperar las empresas. Por favor, intente nuevamente más tarde.');
  }
}


export const empresaRegistrerController = async (req, res) => {

  const { nom, direccion, refUser, refOfertaLaboral } = req.body

  const gestorempresa = new EmpresaModel({
    nom, direccion, refUser, refOfertaLaboral
  })
  console.log(gestorempresa)
  await gestorempresa.save()
  const gestor = await GestorModel.findOneAndUpdate(
    {  refUser },
    { refEmpresa: gestorempresa._id }
  );

  res.send('empresa creada con extito')

}

export const updateEmpresaController = async (req, res) => {
  try {
    const id = req.params.id
    // Actualizamos el registro del gestor en la base de datos
    await EmpresaModel.findByIdAndUpdate(id, req.body, { new: true })

    // Enviamos un mensaje de éxito
    return res.send('Datos de la empresa actualizados con éxito')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
  }
}

export const deleteEmpresaController = async (req, res) => {
  try {

    const id = req.params.id
    // Borramos el registro de la empresa de la base de datos
    await InscripcionModel.deleteMany({ idEmpresa: id })
    await OfertaLaboral.deleteMany({ idEmpresa: id });
    await EmpresaModel.deleteOne({ _id: id });

    // Enviamos un mensaje de éxito
    return res.send('Empresa eliminada con éxito')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
  }
}

export const estadoInscripcion = async (req, res) => {
  try {
    

  const id = req.params.id
  const data = req.body
  const inscripcion = await InscripcionModel.findById(id)
  
  const idOferta = inscripcion.refOfertaLaboral
  
  const oferta = await OfertaLaboral.findById(idOferta)
  
console.log(oferta)
  const gestorID = oferta.createBy

  const gestor = await UserModel.findById(gestorID)
  console.log(gestor)

  const userID = inscripcion.refUser 
  const estudiante = await UserModel.findById(userID)
 
  const mailFrom = gestor.email
  const mailTO = estudiante.email
  
    const bodyHTML = `
      hola soy ${gestor.name} y hemos aceptado su solicitud a la oferta ${oferta.name} con el codigo de oferta ${oferta.id}
    `

    if(data.estado === 'aceptar'){
      // enviar email
      await InscripcionModel.findByIdAndUpdate(id, {estado: 'aceptado'}, { new: true })
      await sendMail(mailFrom, mailTO , 'nueva oferta', bodyHTML)
   
      return res.send('Empresa eliminada con éxito')
    }
    if(data.estado === 'rechazar'){
      // enviar email
      await InscripcionModel.findByIdAndUpdate(id, {estado: 'rechazado'}, { new: true })
      return 'candidatura rechazada'
    }
  } catch (error) {
      return res.send({msg:'error al modificar la postulacion', error})
  }


}
