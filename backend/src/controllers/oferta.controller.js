import OfertaLaboral from "#schemas/ofertaLaboral.js"
// import GestorModel from "#schemas/Gestor.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import jwt from 'jsonwebtoken'
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
import { getUserToken } from "#Lib/auth.js";



export const ofertaRegisterController = async (req, res) => {

//   // Primero, leemos el token de la solicitud HTTP
//   const token = req.headers['x-access-token'];

//   // Verificamos la firma del token utilizando la clave secreta
//   jwt.verify(token, process.env.secretWord, (error, decoded) => {
//     if (error) {
//       // Si hay un error, significa que el token es inválido o ha sido alterado
//       return res.status(401).send({ message: 'Token inválido' });
//     }

//     // Si no hay error, significa que el token es válido
//     // Podemos obtener el contenido del token decodificándolo
//     const content = jwt.decode(token);

//     // Ahora podemos extraer el id del usuario del contenido del token
//     const idUser = content.id;

//     // Continúa tu código aquí, utilizando el id del usuario para realizar las acciones necesarias
//   });



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
 /*  
try {
    const oferta = await OfertaLaboral.findById(req.params.id)
    res.send({ data:oferta })
} catch (error) {
    res.status(404).send({message: `error al borrar el producto ${err}`})
}

*/

// IMPORTANTE ! HACER UN IF QUE COMPRUEBE EL IDEMPRESA (OFERTA) CON EL IDEMPRESA (TOKEN)
try {
    const ofertaId = req.params.ofertaId
    await OfertaLaboral.findByIdAndDelete(ofertaId) 
    res.status(200).send('Oferta eliminada con exito')
} catch (error) {
    res.send(error)
}


    
    // OfertaLaboral.findById(ofertaId, (err, ofertaLaboral) => {
    //     if(err) res.status(500).send({message: `error al borrar el producto ${err}`})

    // ofertaLaboral.remove(err => {
    //     if(err) res.status(500).send({message: `error al borrar el producto ${err}`})
    //     res.status(200).send({message:`el producto ha sido eliminado`})
    // }) 
    // })


}


