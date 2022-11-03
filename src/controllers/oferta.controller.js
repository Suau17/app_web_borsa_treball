import OfertaLaboral from "#schemas/ofertaLaboral.js"
import GestorModel from "#schemas/Gestor.js"

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


