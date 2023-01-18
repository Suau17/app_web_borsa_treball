import Gestor from "#schemas/Gestor.js"
import { body, validationResult} from 'express-validator'
import empresaModel from "#schemas/empresas.schema.js"
import OfertaLaboral from "#schemas/ofertaLaboral.js"

// crear empresa + validar dades

export const rules =  [
    body("nomEmpresa")
        .trim()
        .isLength({ min: 3, max: 50})
        .withMessage(`Name ha de estar entre 3 y 50`)
        .escape(),

    body("nomGestor", "name not correct")
        .trim()
        .isLength({ min: 2, max:50})
    ]

export const getEmpresaController = async (req, res) => {
    Gestor.find().exec(function async (err, list_empresa) {

        
        if (err) {
            return next(err)
        }
        
       // res.send({ listaOfertas : list_ofertas })
      
        res.render('empresa/list',{listaEmpresa: list_empresa})   
          
        
    }
    
    
    )
}


export const registerEmpresaControllers = async (req, res) => {
    const errors = validationResult(req)
    const { nomEmpresa ,nomGestor, carrec , telefon , gestor , perfilHabilitado, refUser } = req.body
    

    

   const gestorempresa = new Gestor({
    nomEmpresa ,nomGestor, carrec , telefon , gestor , perfilHabilitado, refUser
    })
    await gestorempresa.save()

   
// return res.render('/empresa')
GestorModel.find().exec(function async (err, list_empresa) {

        
    if (err) {
        return next(err)
    }
    
   // res.send({ listaOfertas : list_ofertas })
  
   return  res.render('empresa/list',{listaEmpresa: list_empresa})
      
    
}

)}


export const deleteEmpresaController = async (req, res) => {
    /*  
   try {
       const oferta = await OfertaLaboral.findById(req.params.id)
       res.send({ data:oferta })
   } catch (error) {
       res.status(404).send({message: `error al borrar el producto ${err}`})
   }
   
   */
       
       let empresaId = req.params.userId
       Gestor.findById(empresaId, (err, Gestor) => {
   
           if(err) return res.status(500).send({message: `error al borrar el usuario ${err}`})
            
           Gestor.delete(err => {
           if(err) res.status(500).send({message: `error al borrar el usuario ${err}`})
           //res.status(200).send({message:`el usuario ha sido eliminado`})
           return res.redirect('/')
           
       }) 
      
       })
   
   
   }
   export const EmpresarDeleteControllers = (req, res, next) => {
    let empresaId = req.params.id;
    Gestor.findByIdAndRemove(empresaId)
        .then(() => {
          res.locals.redirect = "/empresa";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
  }

 
  
