import mongoose from "mongoose";
const {model ,Schema} = mongoose

const empresaSchema = new Schema({
    nom: { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    direccion : { type: 'string', required: true, minLenght: 4,  maxLength: 60},
    empresaHabilitada : {type: 'boolean'},
  
    /*  ofertaLaboralPublicada : [{
        type: Schema.type.ObjectId,
        ref: 'ofertaLaboral'
    }] */
    
    refOfertaLaboral: [{
        type: Schema.type.ObjectId,
        ref: 'ofertaLaboral'
    }]
    
})

const empresaModel = model('Empresa', empresaSchema)

export default empresaModel