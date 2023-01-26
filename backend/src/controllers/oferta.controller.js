import OfertaLaboral from "#schemas/ofertaLaboral.js"
// import GestorModel from "#schemas/Gestor.js"
import GestorModel from "#schemas/Gestor.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import InscripcionModel from '#schemas/inscripcion.js'


export const getOfertasController = (req, res, next) => {

    OfertaLaboral.find().populate('createBy').exec(function async(err, listOfertas) {


        if (err) {
            return next(err)
        }

        res.send({ listaOfertas: listOfertas })

        //  res.render('ofertas/list',{listaOfertas: list_ofertas})   


    }


    )
}

export const getOfertaEmpresaController = (req, res, next) => {
    const idEmpresa = req.params.id;

    OfertaLaboral.find({ idEmpresa: idEmpresa }).populate('createBy').exec((err, listOfertas) => {
        if (err) {
            return next({ error: err, msg: "error" })
        }
        res.send({ listaOfertas: listOfertas });
    });
}


/**
 * Con el token id accede a su informacion y comprueba si su empresa tiene el mismo id que idEmpresa, asi evitamos que un usuario que no sea de esta empresa
 * pueda crear las ofertas que le da la gana
 * @param {body, token id} req 
 * @param {*} res 
 * @returns 
 */
export const ofertaRegisterController = async (req, res) => {
    try {

        const { title, description, requirements, skills, ciclo, dateOfPublication, expirationDate} = req.body
        const idUsuario = req.idToken;

        const empresa = await EmpresaModel.findOne({refUser: {$in: [idUsuario]}});
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

        return res.status(200).send('oferta creada con exito')
    } catch (error) {
        return res.status(404).send('ha habido un error al registrar la oferta')
    }
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

        const idUsuario = req.idToken;
        const oferta = await OfertaLaboral.findById(id)
        const empresa = await EmpresaModel.findOne({empleados: {$in: [idUsuario]}});
    console.log(empresa)
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

        const idUsuario = req.idToken;
        const oferta = await OfertaLaboral.findById(ofertaId)
        const empresa = await EmpresaModel.findOne({refUser: {$in: [idUsuario]}});
    
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


