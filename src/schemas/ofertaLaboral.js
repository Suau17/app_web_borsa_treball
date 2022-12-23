import mongoose from "mongoose";
const {model ,Schema} = mongoose

const ofertaLaboralSchema = new Schema({
    title : { type: 'string', required: true,  maxLength: 100},    
    description : { type: 'string', required: true},
    requirements : { type: 'string', required: true},
    skills : { type: 'string', required: true},
    ciclo : { type: 'string', required: true, maxLength: 150},
    dateOfPublication : { type: 'date'},
    expirationDate : { type: 'date'},
    createBy : {type: mongoose.Schema.Types.ObjectID, ref:'Empresa', required:true},
    refUsersInscritos: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }]
})

const OfertaLaboral = model('ofertaLaboral', ofertaLaboralSchema)

export default OfertaLaboral

