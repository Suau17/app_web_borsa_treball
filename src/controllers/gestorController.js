var Gestor = require("../models/gestor");


// crear empresa
export const registerEmpresaControllers = (req, res) => {

    UserModel.find().exec(function async (err, list_users) {
        if (err) {
            return next(err);
        }
        // en la view saldara una var con json list_users
      res.send({ listaUsuarios: list_users })
      
       
            // 'await' espera a que trobi les dades de Genere. Amb 'await' es obligat posar 'async' a la
            // definició del mètode. El 'await' sempre ha d'estar entre un 'try-catch'
            
       //    res.render('users/list',{listaUsuarios: list_users})   
          
        
    }) 
}