import OfertaLaboral from "#schemas/ofertaLaboral.js"
import GestorModel from "#schemas/Gestor.js"
import mongoose from 'mongoose';

export const ofertaRegisterController = async (req, res) => {
    const { title ,description ,requirements , skills , ciclo , dateOfPublication, expirationDate, createBy} = req.body

   const ofertaLaboral = new OfertaLaboral({
    title, description, requirements, skills, ciclo, dateOfPublication, expirationDate, createBy
    })
    await ofertaLaboral.save()

return res.send('oferta creada con exito')

}

export const getOfertasController = (req, res) => {

    OfertaLaboral.find().exec(function async (err, list_ofertas) {

        
        if (err) {
            return next(err)
        }
        
       // res.send({ listaOfertas : list_ofertas })
      
        res.render('ofertas/list',{listaOfertas: list_ofertas})   
          
        
    }
    
    
    )
}

export const updateController = async (req, res) => {
    let id = req.params.id

    const oferta = await OfertaLaboral.findById(id)
   // res.send({oferta:oferta})
    res.render('ofertas/update',{oferta: oferta})  

  
    
}

export const updateOfertaController = async (req, res) => {
    try {
        let id = req.params.id

        const oferta = await OfertaLaboral.findById(id)
        Object.assign(oferta, req.body)
        oferta.save()
        res.status(200).send({error: "UPDATE"})
    } catch (error) {
        res.status(404).send({error: "ERROR UPDATE"})
    }
}

export const removeOfertaController = async (req, res) => {
 /*  
try {
    const oferta = await OfertaLaboral.findById(req.params.id)
    res.send({ data:oferta })
} catch (error) {
    res.status(404).send({message: `error al borrar el producto ${err}`})
}

*/
    
    let ofertaId = req.params.ofertaId
    OfertaLaboral.findById(ofertaId, (err, ofertaLaboral) => {

        if(err) res.status(500).send({message: `error al borrar el producto ${err}`})

    ofertaLaboral.remove(err => {
        if(err) res.status(500).send({message: `error al borrar el producto ${err}`})
        res.status(200).send({message:`el producto ha sido eliminado`})
    }) 
    })


}

