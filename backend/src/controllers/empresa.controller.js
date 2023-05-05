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
    res.status(500).send(`S'ha produit un error inesperat al recuperar les empreses. Intenta-ho de nou més endavant.`);
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
    res.status(500).send(`S'ha produit un error inesperat al recuperar les empreses. Intenta-ho de nou més endavant.`);
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
   
    if (!empleados.includes(idUsuario.toString()) || usuario.rolUser !== 'gestor') {
      return res.status(401).send('No tens els permissos per a eliminar aquesta empresa.');
    }
    const gestores = await GestorModel.find({ nameEmpresa: empresa.nom });
    for (let gestor of gestores) {
      gestor.nameEmpresa = req.body.nameEmpresa;
      await gestor.save();
    }
    // Actualizamos el registro del gestor en la base de datos
    empresa.nom = req.body.nameEmpresa
    empresa.sector = req.body.sector
    empresa.direccion = req.body.direccion
    empresa.save()
    // Enviamos un mensaje de éxitol
   const msg = {
      data : empresa ,
      resposta : 'Empresa actualitzada amb èxit.'
    }
    return res.send(msg)
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send(`S'ha produit un error inesperat. Intenta-ho de nou més endavant.`)
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
      return res.status(401).send('No tens els permissos per a eliminar aquesta empresa.');
    }
    // Borramos el registro de la empresa de la base de datos
    await InscripcionModel.deleteMany({ idEmpresa: empresa._id })
    await OfertaLaboral.deleteMany({ idEmpresa: empresa._id });
    await EmpresaModel.deleteOne({ _id: empresa._id });

    // Enviamos un mensaje de éxito
    return res.send('Empresa eliminada con èxit')
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).send(`S'ha produit un error inesperat. Intenta-ho de nou més endavant.`)
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
      resposta : 'Empleats trobats.'
    }
    res.send(msg);
  } catch (error) {
    res.status(500).send(`S'ha produit un error inesperat al recuperar les empreses. Intenta-ho de nou més endavant.`);
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
      res.status(401).send(`No tens els permissos per a canviar l'estat d'aquesta inscripció.`);
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
      Hola, em dic ${empleado.name} i hem acceptat la seva sol·licitud a la oferta ${oferta.name} amb el codi ${oferta.id}.`


    const msg = {}
    if (data.estado === 'aceptar') {
      // enviar email

        await InscripcionModel.findByIdAndUpdate(id, { estado: 'aceptado' }, { new: true })
      await sendMail(mailFrom, mailTO, 'nueva oferta', bodyHTML)

      msg.msg = 'Candidatura acceptada.'
      msg.code = 1
    }
    if (data.estado === 'rechazar') {
      // enviar email
      await InscripcionModel.findByIdAndUpdate(id, { estado: 'rechazado' }, { new: true })
      msg.msg = 'Candidatura rebutjada.'
      msg.code = 0
    }
    return res.send(msg)
  } catch (error) {

    return res.status(402).send({ msg: 'Error al modificar la postulació.', error })

  }


}
