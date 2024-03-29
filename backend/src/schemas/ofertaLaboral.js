import mongoose from "mongoose";
const {model ,Schema} = mongoose

const ofertaLaboralSchema = new Schema({
    title : { type: 'string', required: true,  maxLength: 100},    
    description : { type: 'string', required: true},
    requirements : { type: 'string', required: true},
    skills : { type: 'string'},
    ciclo : { type: 'string', required: true, maxLength: 150},
    dateOfPublication : { type: 'date',  default: Date.now },
    expirationDate : { type: 'date'},
    idEmpresa : {type: mongoose.Schema.Types.ObjectID, ref:'Empresa', required:true},
    createBy : {type: mongoose.Schema.Types.ObjectID,ref:'User', required:true, cascade:true},
    refUsersInscritos: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }],
    refCiclo : {type: mongoose.Schema.Types.ObjectID, ref:'Estudios', required:false} 
}) 

const OfertaLaboral = model('ofertaLaboral', ofertaLaboralSchema)

export default OfertaLaboral

