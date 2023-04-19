import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import OfertaLaboral from '#schemas/ofertaLaboral.js'
import InscripcionModel from '#schemas/inscripcion.js'
import { ObjectId } from 'mongoose'
import * as userController from '#controllers/user.controller.js'
import { sendMail } from '#Lib/email.js'
import UserModel from '#schemas/User.js'



// Recuperar todas las empresas
export const getAllEmpresaControllers = async (req, res) => {
  try {
    console.log('access')
    // Obtener los parámetros de paginación de la solicitud
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;

    // Calcular el índice del primer elemento y el índice del último elemento
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Obtener todas las empresas de la base de datos
    const empresas = await EmpresaModel.find().skip(startIndex).limit(itemsPerPage);

    // Calcular el número total de empresas
    const totalEmpresas = await EmpresaModel.countDocuments();

    // Crear un objeto de respuesta con los datos de la página actual
    const response = {
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: totalEmpresas,
      totalPages: Math.ceil(totalEmpresas / itemsPerPage),
      empresas: empresas
    };

    // Enviar las empresas en la respuesta
    res.send(response);
  } catch (error) {
    res.status(500).send('Ocurrió un error al recuperar las empresas. Por favor, intente nuevamente más tarde.');
  }
};


export const getEmpresaControllers = async (req, res) => {
  try {
    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser

    const empresa = await EmpresaModel.findOne({ refUser: idUsuario })
    // Enviar las empresas en la respuesta
    res.status(200).send({empresa});
  } catch (error) {
    res.status(500).send('Ocurrió un error al recuperar las empresas. Por favor, intente nuevamente más tarde.');
  }
}

export const empresaRegistrerController = async (req, res) => {




    const { nameEmpresa, direccion, sector } = req.body
    const nom = nameEmpresa
    const refUser = req.idToken;
    const refOfertaLaboral = [];
    const empresa = new EmpresaModel({
      nom, direccion, sector, refUser, refOfertaLaboral,
    })
    await empresa.save()
    await EmpresaModel.findOneAndUpdate(
      { _id: empresa._id },
      { $push: { empleados: refUser } }
    );
    return empresa._id || false


}

/**
 * 
 * @param {id empresa(string), body->(update empresa)} req 
 * @param {*} res 
 * @returns 
 */
export const updateEmpresaController = async (req, res) => {
  try {
    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser

    const empresa = await EmpresaModel.findOne({ refUser: idUsuario })
    const usuario = await UserModel.findById(idUsuario);
    const empleados = empresa.empleados.map(empleado => empleado.toString());
    console.log(empleados)
   
    if (!empleados.includes(idUsuario.toString()) || usuario.rolUser !== 'gestor') {
      return res.status(401).send('No tienes los permisos para eliminar esta empresa.');
    }
    // Actualizamos el registro del gestor en la base de datos
    let empresaUpdated = await EmpresaModel.findByIdAndUpdate(empresa._id, req.body, { new: true })
    await GestorModel.findOneAndUpdate({ refUser: idUsuario },{nameEmpresa:req.body.nom}, { new: true });
    // Enviamos un mensaje de éxitol
   const msg = {
      data : empresaUpdated ,
      resposta : 'Empresa Actualizada con exito'
    }
    return res.send(msg)
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
    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser

    const empresa = await EmpresaModel.findOne({ refUser: idUsuario })
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


export const getEmployeesControllers = async (req, res) => {
  try {
    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser

    const empresa = await EmpresaModel.findOne({ refUser: idUsuario })
    const empleados = await Promise.all(empresa.empleados.map(empleado => UserModel.findById(empleado)));
    // Enviar las empresas en la respuesta
    const msg = {
      empleados : empleados ,
      resposta : 'Empleados encontrados'
    }
    res.send(msg);
  } catch (error) {
    res.status(500).send('Ocurrió un error al recuperar las empresas. Por favor, intente nuevamente más tarde.');
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

    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser;
    const data = req.body
    const id = req.params.idInscripcion

    const empleado = await UserModel.findById(idUsuario)
    const inscripcion = await InscripcionModel.findById(id)
    const idOferta = inscripcion.refOfertaLaboral
    const oferta = await OfertaLaboral.findById(idOferta)
    const empresa = await EmpresaModel.findOne({ _id: oferta.idEmpresa });
    if (!empresa.empleados.includes(empleado._id)) {
      res.status(401).send('No tienes los permisos para cambiar el estado de esta inscripción');
      return;
    }
    // obtener email del estudiante
    const userID = inscripcion.refUser
    const estudiante = await UserModel.findById(userID)

    // definir variables email
    const mailFrom = empleado.email
    const mailTO = estudiante.email

    // definir cuerpo del mensaje
    const bodyHTML = `
      hola soy ${empleado.name} y hemos aceptado su solicitud a la oferta ${oferta.name} con el codigo de oferta ${oferta.id}
    `


    const msg = {}
    if (data.estado === 'aceptar') {
      // enviar email

        await InscripcionModel.findByIdAndUpdate(id, { estado: 'aceptado' }, { new: true })
      await sendMail(mailFrom, mailTO, 'nueva oferta', bodyHTML)

      msg.msg = 'Candidatura aceptada'
      msg.code = 1
    }
    if (data.estado === 'rechazar') {
      // enviar email
      await InscripcionModel.findByIdAndUpdate(id, { estado: 'rechazado' }, { new: true })
      msg.msg = 'Candidatura Rechazada'
      msg.code = 0
    }
    return res.send(msg)
  } catch (error) {

    return res.status(402).send({ msg: 'error al modificar la postulacion', error })

  }


}
