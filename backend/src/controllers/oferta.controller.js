import OfertaLaboral from "#schemas/ofertaLaboral.js"
// import GestorModel from "#schemas/Gestor.js"
import GestorModel from "#schemas/Gestor.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import InscripcionModel from '#schemas/inscripcion.js'
import UserModel from "#schemas/User.js"
import { listarOfertas } from "./estudiantes.controller.js"

/**
 * Devuelve TODAS las ofertas
 * @param {} req 
 * @param {listOfertas (type array)} res 
 * @param {*} next 
 */
export const getOfertasController = (req, res, next) => {

    OfertaLaboral.find().populate('createBy').exec(function async(err, listOfertas) {

        if (err) {
            return next(err)
        }

        console.log(listOfertas)
        res.send({ listaOfertas: listOfertas })
    })
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

export const getOfertaController = async (req, res, next) => {
    let id = req.params.idOferta;
    console.log(req.params)
    console.log(id)
    const oferta = await OfertaLaboral.findById(id)
    const inscritos = await Promise.all(oferta.refUsersInscritos.map(estudiante => UserModel.findById(estudiante)));
    const msg = {
        oferta: oferta,
        inscritos: inscritos
    }
    return res.send(msg)
}
export const getInscritosController = async (req, res, next) => {
    let id = req.params.idOferta;

    const inscripciones = await InscripcionModel.find({ refOfertaLaboral: id })
    const inscritos = await Promise.all(inscripciones.map(async (inscripcion) => {
        console.log(inscripcion)
        const user = await UserModel.findById(inscripcion.refUser)
        console.log(user)
        inscripcion.refUser = user
    }));

    const msg = {
        inscripciones: inscripciones,
    }
    return res.send(msg)
}

/**
 * Devuelve UNA oferta ......... PENDIENTE DE REVISIÓN
 * @param {ObjectId(oferta)} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getOfertaEmpresaController = async (req, res, next) => {
    try {
        const gestorToken = req.gestorV;
        const nameEmpresa = gestorToken.nameEmpresa;
        const empresa = await EmpresaModel.findOne({ nom: nameEmpresa });
        if (!empresa) {
            return next({ error: "Empresa not found", msg: "error" });
        }
        const listOfertas = await OfertaLaboral.find({ idEmpresa: empresa._id }).populate('createBy');
        res.send({ listaOferta: listOfertas });
    } catch (err) {
        return next({ error: err, msg: "error" });
    }
}


/**
 * Con el token id accede a su informacion y comprueba si su empresa tiene el mismo id que idEmpresa, asi evitamos que un usuario que no sea de esta empresa
 * pueda crear las ofertas que le da la gana
 * @param {body, token id} req 
 * @param {*} res 
 * @returns 
 */
export const ofertaRegisterController = async (req, res) => {

    const { title, description, requirements, skills, ciclo, dateOfPublication, expirationDate } = req.body
    const gestorToken = req.gestorV;
    const idUsuario = gestorToken.refUser;

    const empresa = await EmpresaModel.findOne({ refUser: { $in: [idUsuario] } });
    console.log(empresa)
    console.log(idUsuario)
    if (!idUsuario) {
        res.status(401).send('No tienes los permisos para registrar una oferta de trabajo en esta empresa')
        return;
    }

    const createBy = idUsuario
    const idEmpresa = empresa._id

    const ofertaLaboral = new OfertaLaboral({
        title, description, requirements, skills, ciclo, dateOfPublication, expirationDate, idEmpresa, createBy
    })
    await ofertaLaboral.save()
    const msg = {
        oferta: ofertaLaboral,
        resposta: 'oferta creada amb exit'
    }
    return res.status(200).send(msg)

}


/**
 * 
 * @param {id oferta(string)} req 
 * @param {*} res 
 * @returns 
 */
export const updateOfertaController = async (req, res) => {
    try {
        const id = req.params.id
        const gestorToken = req.gestorV;
        const idUsuario = gestorToken.refUser;

        const oferta = await OfertaLaboral.findById(id)
        const empresa = await EmpresaModel.findOne({ empleados: { $in: [idUsuario] } });
        if (!idUsuario || !oferta.idEmpresa.equals(empresa._id)) {
            res.status(401).send('No tienes los permisos para actualizar una oferta de trabajo en esta empresa')
            return;
        }

        await OfertaLaboral.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).send("UPDATE")
    } catch (error) {
        res.status(404).send(error)
    }
}


/**
 * 
 * @param {id oferta(string)} req 
 * @param {*} res 
 * @returns 
 */
export const removeOfertaController = async (req, res) => {

    // IMPORTANTE ! HACER UN IF QUE COMPRUEBE EL IDEMPRESA (OFERTA) CON EL IDEMPRESA (TOKEN)
    try {
        const ofertaId = req.params.ofertaId

        const gestorToken = req.gestorV;
        const idUsuario = gestorToken.refUser;
        const oferta = await OfertaLaboral.findById(ofertaId)
        const empresa = await EmpresaModel.findOne({ refUser: { $in: [idUsuario] } });

        if (!idUsuario || !oferta.idEmpresa.equals(empresa._id)) {
            res.status(401).send('No tienes los permisos para actualizar una oferta de trabajo en esta empresa')
            return;
        }

        await InscripcionModel.deleteMany({ refOfertaLaboral: ofertaId })
        await OfertaLaboral.findByIdAndDelete(ofertaId)
        res.status(200).send('Ofertsa eliminada con exito')
    } catch (error) {
        res.send(error)
    }

}


