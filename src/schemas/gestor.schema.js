import mongoose from "mongoose";
const {model ,Schema} = mongoose

const gestorSchema = new Schema({
    nom: { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    cognoms : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    carrec : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    dni : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    gestor : {type: 'boolean'},
    perfilHabilitado : {type: 'boolean'},
    // ofertaLaboralPublicada : [{
    //     type: Schema.type.ObjectId,
    //     ref: 'ofertaLaboral'
    // }],
    
    refUser: [{
        type: Schema.type.ObjectId,
        ref: 'User'
    }]
    
})

const gestorModel = model('Gestor', gestorSchema)

export default gestorModel