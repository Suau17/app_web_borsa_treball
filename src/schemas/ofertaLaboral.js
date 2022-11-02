import mongoose from "mongoose";
const {model ,Schema} = mongoose

const ofertaLaboralSchema = new mongoose.Schema({
    title : { type: 'string', required: true,  maxLength: 100},    
    description : { type: 'string', required: true},
    requirements : { type: 'string', required: true},
    skills : { type: 'string', required: true},
    ciclo : { typse: 'string', required: true, maxLength: 150},
    tipo : { type: 'string', enum: ["presencial","telemático","híbrido"],required: true},
    dateOfPublication : { type: 'date', required: true},
    expirationDate : { type: 'date'},
    createBy : [{
        type: Schema.type.ObjectId,
        ref: 'gestor.schema'
    }],
    User : [{
        type: Schema.type.ObjectId,
        ref: 'User'
    }]
})

const OfertaLaboral = model('ofertaLaboral', ofertaLaboralSchema)

export default OfertaLaboral

OfertaLaboral.create({})