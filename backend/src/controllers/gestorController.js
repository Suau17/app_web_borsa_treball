import GestorModel from "#schemas/Gestor.js"
import UserModel from "#schemas/User.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import OfertaLaboral from "#schemas/ofertaLaboral.js"
import * as userController from '#controllers/user.controller.js'
import { empresaRegistrerController } from "./empresa.controller.js"
import { hash } from 'bcrypt'

export const gestorRegistrerController = async (req, res) => {
    try {
        let msg;
        const { carrec, telefon, nameEmpresa } = req.body
        req.body.rolUser = 'gestor';
        const { id, token } = await userController.userRegistrerController(req, res)
        req.idToken = id
        const empresaId = await empresaRegistrerController(req, res)
        if (id !== false || empresaId !== false) {
            const gestor = new GestorModel({
                carrec,
                telefon,
                nameEmpresa,
                refUser: id,
                responsable: false,
                refEmpresa: empresaId
            })
            await gestor.save()
            console.log(token)
            msg = {
                token: token,
                role: 'gestor',
                resposta: 'Token enviat com a cookie.'
            }
        } else {
            msg = {
                token: token,
                role: 'gestor',
                resposta: 'Error al crear el token.'
            }
        }
        return res.send(msg)

    } catch (error) {
        return res.status(500).send(`S'ha produit un error inesperat. Intenta-ho de nou més endavant.`);
    }
}

export const createResponsableController = async (req, res) => {
    try {
        req.body.rolUser = 'responsable'
        const { id, token } = await userController.userRegistrerController(req, res)
        const gestorToken = req.gestorV;
        const nameEmpresa = gestorToken.nameEmpresa
        const { carrec, telefon } = req.body
        if (id) {
            const gestor = new GestorModel({
                carrec,
                telefon,
                nameEmpresa,
                refUser: id,
                responsable: true,
                perfilHabilitado: true
            })
            await gestor.save()
            console.log(gestor)
            await EmpresaModel.findOneAndUpdate(
                { nom: nameEmpresa },
                { $push: { empleados: id } }
            );
            const msg = {
                token: token,
                role: 'responsable',
                resposta: 'Token enviat com a cookie'
            }
            return res.send(msg)
        }
        return res.send('error')
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const updateGestorController = async (req, res) => {
    try {
        // Obtenemos el id del gestor y los datos a actualizar proporcionados
        const data = req.body
        const gestorToken = req.gestorV;
        const idUsuario = gestorToken.refUser

        if (!idUsuario) {
            res.status(401).send('No tens els permissos per a esborrar un altre usuari.')
            return;
        }

        if ('rolUser' in data) {
            return res.status(401).send('No pots modificar el teu rol.')
        }
        if ('perfilHabilitado' in data) {
            return res.status(401).send(`No pots habilitar el teu rol. Comunica-ho a l'administrador de la app.`)
        }
        // Actualizamos el registro del gestor en la base de datos
        const gestor = await GestorModel.findOneAndUpdate({ refUser: idUsuario }, req.body, { new: true });

        const idUser = gestor.refUser

        if (data.password || data.name || data.email || data.description) {
            if (data.password) {
                data.password = await hash(data.password, 12)
            }
            await UserModel.findByIdAndUpdate(idUser, req.body, { new: true })
        }
        // Encriptamos la contraseña del gestor si se proporciona en los datos a actualizar



        // Enviamos un mensaje de éxito
        return res.send({ msg: 'Gestor actualizat amb éxit' })
    } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).send(`S'ha produit un error inesperat. Intenta-ho de nou més endavant.`)
    }
}

export const getOfertasEmpresa = async (req, res, next) => {
    try {
        const id = req.params.id
        const listOfertas = await OfertaLaboral.find({ idEmpresa: id }).populate('createBy');
        const msg = {
            listaOfertas: listOfertas,
            resposta: 'Ofertes de la empresa recuperades.'
        }
        return res.status(200).send(msg)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const deleteEmpleados = async (req, res) => {
    try {


        const idEmpleado = req.body.id;
        const gestor = req.gestorV;
        const idUsuario = gestor.refUser;

        const empresa = await EmpresaModel.findOne({ empleados: { $in: [idEmpleado] } });

        if (!empresa || !empresa.empleados.includes(idUsuario) || !empresa.empleados.includes(idEmpleado) || gestor.responsable === true || gestor.refUser == idEmpleado) {
            res.status(401).send({ msg: 'No tienes los permisos para actualizar una oferta de trabajo en esta empresa' });
            return;
        }

        await empresa.updateOne({ $pull: { empleados: idEmpleado } });
        await GestorModel.deleteOne({ refUser: idEmpleado });
        await UserModel.deleteOne({ _id: idEmpleado });

        res.status(200).send({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(401).send({ msg: 'Ha habido un error al eliminar el empleado ' });
    }
}




