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

  const { nom, direccion } = req.body

  const refUser = req.idToken;
  const refOfertaLaboral = [];
  const gestorempresa = new EmpresaModel({
    nom, direccion, refUser, refOfertaLaboral, 
  })
  console.log(gestorempresa)
  await gestorempresa.save()
  await EmpresaModel.findOneAndUpdate(
    { _id: gestorempresa._id },
    { $push: { empleados: refUser } }
);
  await GestorModel.findOneAndUpdate(
    {  refUser },
    { refEmpresa: gestorempresa._id }
  );

  res.send('empresa creada con extito')

}

/**
 * 
 * @param {id empresa(string), body->(update empresa)} req 
 * @param {*} res 
 * @returns 
 */
export const updateEmpresaController = async (req, res) => {
  try {
    const idUsuario = req.idToken;

    const empresa = await EmpresaModel.findOne({refUser : idUsuario})
    const usuario = await UserModel.findById(idUsuario);
    const empleados = empresa.empleados.map(empleado => empleado.toString());
    if (!empleados.includes(idUsuario) || usuario.rolUser !== 'gestor') {
        return res.status(401).send('No tienes los permisos para eliminar esta empresa.');
    }
    // Actualizamos el registro del gestor en la base de datos
    await EmpresaModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    // Enviamos un mensaje de éxito
    return res.send('Datos de la empresa actualizados con éxito')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
  }
}


/**
 * 
 * @param {id Empresa(string)} req 
 * @param {*} res 
 * @returns 
 */
export const deleteEmpresaController = async (req, res) => {
  try {
    const idUsuario = req.idToken;

   const empresa = await EmpresaModel.findOne({refUser : idUsuario})
    const usuario = await UserModel.findById(idUsuario);
    const empleados = empresa.empleados.map(empleado => empleado.toString());
    if (!empleados.includes(idUsuario) || usuario.rolUser !== 'gestor') {
        return res.status(401).send('No tienes los permisos para eliminar esta empresa.');
    }
    // Borramos el registro de la empresa de la base de datos
    await InscripcionModel.deleteMany({ idEmpresa: empresa._id })
    await OfertaLaboral.deleteMany({ idEmpresa: empresa._id });
    await EmpresaModel.deleteOne({ _id: empresa._id });

    // Enviamos un mensaje de éxito
    return res.send('Empresa eliminada con éxito')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
  }
}

/**
 * Este controlador actualiza el estado de inscripcion e informa al usuario enviando un email
 * @param {id Inscripcion(string), estado('aceptar' || 'rechazar')} req 
 * @param {*} res 
 * @returns 
 */
export const cambiarEstadoInscripcion = async (req, res) => {
  try {
    
  const idUsuario = req.idToken;

  const data = req.body
  //ID inscripción
  const id = data.id

  const usuario = await UserModel.findById(idUsuario)

  const inscripcion = await InscripcionModel.findById(id)
  
  const idOferta = inscripcion.refOfertaLaboral
  
  const oferta = await OfertaLaboral.findById(idOferta)

  const empresa = await EmpresaModel.findOne({ _id: oferta.idEmpresa });

  if (!empresa.empleados.includes(usuario._id)) {
    res.status(401).send('No tienes los permisos para cambiar el estado de esta inscripción');
    return;
  }
  // obtener email del estudiante
  const userID = inscripcion.refUser 
  const estudiante = await UserModel.findById(userID)
 
  // definir variables email
  const mailFrom = usuario.email
  const mailTO = estudiante.email
  
  // definir cuerpo del mensaje
    const bodyHTML = `hola soy ${empleado.name} y hemos aceptado su solicitud a la oferta ${oferta.name} con el codigo de oferta ${oferta.id}`

    if(data.estado === 'aceptar'){
      // enviar email
      await InscripcionModel.findByIdAndUpdate(id, {estado: 'aceptado'}, { new: true })
      let subject = 'Inscripción aceptada.'
      await sendMail(mailFrom, mailTO , subject, bodyHTML)
   
      return res.send('candidatura aceptada')
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
