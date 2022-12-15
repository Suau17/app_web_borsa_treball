import GestorModel from "#schemas/Gestor.js"
import { body, validationResult} from 'express-validator'

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

export const getEmpresasController = async (req, res) => {
    GestorModel.find().exec(function async (err, list_empresa) {

        
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


    

   const gestorempresa = new GestorModel({
    nomEmpresa ,nomGestor, carrec , telefon , gestor , perfilHabilitado, refUser
    })
    await gestorempresa.save()

   
return res.render('/empresa/getEmpresa')

}


 
  
