var Gestor = require("../models/gestor");

class GestorCotroller {

    /*login para gestor*/
    static create_post(req, res) {
        // console.log(req.body)
        Gestor.create(req.body, function (error, newGestor)  {
            if(error){
                //console.log(error)
                res.render('gestor/new',{error:error.message})
            }else{             
                res.redirect('/gestor')
            }
        })    
      } 
}