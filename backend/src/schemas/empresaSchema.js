
import mongoose from "mongoose";
const {model ,Schema} = mongoose

const empresaSchema = new Schema({
    nom: { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    direccion : { type: 'string', required: true, minLenght: 4,  maxLength: 60},
    sector : { type: 'string', required: true, minLenght: 4,  maxLength: 60},
    /*  ofertaLaboralPublicada : [{
        type: Schema.type.ObjectId,
        ref: 'ofertaLaboral'
    }] */
    refUser: {type: mongoose.Schema.Types.ObjectID,ref:'User', required:true, cascade:true},
    empleados: [{type: mongoose.Schema.Types.ObjectID,ref:'User'}],
    refOfertaLaboral: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'ofertaLaboral',
        cascade: true
    }]
    
})

const empresaModel = model('Empresa', empresaSchema)

export default empresaModel