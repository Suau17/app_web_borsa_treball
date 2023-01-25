import OfertaLaboral from "#schemas/ofertaLaboral.js"
// import GestorModel from "#schemas/Gestor.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import InscripcionModel from '#schemas/inscripcion.js'



export const ofertaRegisterController = async (req, res) => {

    const { title ,description ,requirements , skills , ciclo , dateOfPublication, expirationDate, idEmpresa,createBy} = req.body

   const ofertaLaboral = new OfertaLaboral({
    title, description, requirements, skills, ciclo, dateOfPublication, expirationDate, idEmpresa ,createBy
    })
    await ofertaLaboral.save()

return res.send('oferta creada con exito')

}

export const getOfertasController = (req, res, next) => {

    OfertaLaboral.find().populate('createBy').exec(function async (err, listOfertas) {
    
        
        if (err) {
            return next(err)
        }
        
        res.send({ listaOfertas : listOfertas })
      
      //  res.render('ofertas/list',{listaOfertas: list_ofertas})   
          
        
    }
    
    
    )
}

export const getOfertaEmpresaController = (req, res, next) => {
    const idEmpresa = req.params.id;
    
    OfertaLaboral.find({ idEmpresa: idEmpresa }).populate('createBy').exec((err, listOfertas) => {
        if (err) {
            return next({error: err, msg : "error"})
        }
        res.send({ listaOfertas : listOfertas });
    });
}

export const updateController = async (req, res) => {
    const id = req.params.id

    const oferta = await OfertaLaboral.findById(id)

    const empresa = await EmpresaModel.findByIdAndUpdate(
        id,
        { $push: { ofertas: oferta } },
        { new: true }
      )

    res.send({oferta:oferta})
  //  res.render('ofertas/update',{oferta: oferta})  

  
    
}

export const updateOfertaController = async (req, res) => {
    try {
        const id = req.params.id

  
        await OfertaLaboral.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).send("UPDATE")
    } catch (error) {
        res.status(404).send(error)
    }
}

export const removeOfertaController = async (req, res) => {

// IMPORTANTE ! HACER UN IF QUE COMPRUEBE EL IDEMPRESA (OFERTA) CON EL IDEMPRESA (TOKEN)
try {
    const ofertaId = req.params.ofertaId
    await InscripcionModel.deleteMany({ refOfertaLaboral: ofertaId })
    await OfertaLaboral.findByIdAndDelete(ofertaId) 
    res.status(200).send('Ofertsa eliminada con exito')
} catch (error) {
    res.send(error)
}

}


