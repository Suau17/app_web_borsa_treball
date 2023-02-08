import GestorModel from "#schemas/Gestor.js"
import UserModel from "#schemas/User.js"
import * as userController from '#controllers/user.controller.js'
import { hash } from 'bcrypt'

export const gestorRegistrerController = async (req, res) => {
    try {
        const { carrec, telefon, nameEmpresa } = req.body
        req.body.rolUser = 'gestor';
        const id = await userController.userRegistrerController(req, res)
        console.log('usuario creado' + id)
        const gestor = new GestorModel({
            carrec,
            telefon,
            nameEmpresa,
            refUser: id,
            responsable: false
        })
        await gestor.save()

        return res.send('gestor creado con exito')

    } catch (error) {
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');
    }
}

export const createResponsableController = async (req, res) => {
    try {
        const { carrec, telefon, nameEmpresa } = req.body

        const id = await userController.userRegistrerController(req, res)

        const gestor = new GestorModel({
            carrec,
            telefon,
            nameEmpresa,
            refUser: id,
            responsable : true
        })
        await gestor.save()

        return res.send('gestor creado con exito')

    } catch (error) {
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');
    }
}

export const updateGestorController = async (req, res) => {
    try {
        // Obtenemos el id del gestor y los datos a actualizar proporcionados
        const data = req.body
        const idUsuario = req.idToken;

        if (!idUsuario) {
            res.status(401).send('No tienes los permisos para borrar otro usuario')
            return;
        }

        if ('rolUser' in data) {
            return res.status(401).send('no puedes modificar tu rol')
        }
        if ('perfilHabilitado' in data) {
            return res.status(401).send('no puedes habilitar tu rol, solo el administrador de la app')
        }

        if ('responsable' in data) {
            return res.status(401).send('no puedes cambiar tu tipo de usuario, solo el administrador de la app')
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
        return res.send('Datos del gestor actualizados con éxito')
    } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
    }
}



