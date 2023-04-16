import GestorModel from "#schemas/Gestor.js"
import UserModel from "#schemas/User.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import * as userController from '#controllers/user.controller.js'
import { empresaRegistrerController } from "./empresa.controller.js"
import { hash } from 'bcrypt'

export const gestorRegistrerController = async (req, res) => {
    try {
        let msg;
        const { carrec, telefon, nameEmpresa } = req.body
        req.body.rolUser = 'gestor';
        const {id, token} = await userController.userRegistrerController(req, res)
        req.idToken = id
        const empresaId = await empresaRegistrerController(req,res)
        if(id !== false || empresaId !== false){
        const gestor = new GestorModel({
            carrec,
            telefon,
            nameEmpresa,
            refUser: id,
            responsable: false,
            refEmpresa : empresaId
        })
        await gestor.save()
        console.log(token)
        msg = {
            token : token,
            role : 'gestor',
            resposta : 'Token enviado como cookie'
          }
    } else {
        msg = {
            token : token,
            role : 'gestor',
            resposta : 'error al crear el token'
          }
    }
        return res.send(msg)

} catch (error) {
    return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');        
}      
}

export const createResponsableController = async (req, res) => {
    try {
        req.body.rolUser = 'responsable'
        const {id, token} = await userController.userRegistrerController(req, res)
        const gestorToken = req.gestorV;
        const nameEmpresa = gestorToken.nameEmpresa
        console.log('RESPONSABLE USER')
        const { carrec, telefon } = req.body
console.log(id)
console.log(token)
        if(id){
        const gestor = new GestorModel({
            carrec,
            telefon,
            nameEmpresa,
            refUser: id,
            responsable : true
        })
        await gestor.save()
        console.log(gestor)
        await EmpresaModel.findOneAndUpdate(
            { nom: nameEmpresa },
            { $push: { empleados: id } }
          );
        const msg = {
            token : token,
            role : 'responsable',
            resposta : 'Token enviado como cookie'
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

        if(!idUsuario) {
          res.status(401).send('No tienes los permisos para borrar otro usuario')
          return;
        }

        if ('rolUser' in data) {
            return res.status(401).send('no puedes modificar tu rol')
        }
        if ('perfilHabilitado' in data) {
            return res.status(401).send('no puedes habilitar tu rol, solo el administrador de la app')
        }
        // Actualizamos el registro del gestor en la base de datos
        const gestor = await GestorModel.findOneAndUpdate({ refUser: idUsuario }, req.body, { new: true });
        
        const idUser = gestor.refUser

        if(data.password || data.name || data.email || data.description){
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

    export const getOfertasEmpresa = async (req, res, next) => {
        try {
            const id = req.params.id
            const listOfertas = await OfertaLaboral.find({ idEmpresa: id }).populate('createBy');
            const msg = {
                listaOfertas: listOfertas,
                resposta: 'ofertes de la empresa recuperades'
            }
            return res.status(200).send(msg)
        } catch (error) {
            return res.status(500).send(error)
        }
    }


