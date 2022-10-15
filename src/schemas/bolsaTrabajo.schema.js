import mongoose from "mongoose";
const {model ,Schema} = mongoose

const ofertaLaboralSchema = new Schema({
    title : { type: 'string', required: true,  maxLength: 100},    
    description : { type: 'string', required: true},
    requirements : { type: 'string', required: true, maxLength: 20},
    skills : { type: 'string', required: true, maxLength: 20},
    ciclo : { type: 'string', required: true, maxLength: 20},
    dateOfPublication : { type: 'date', required: true},
    expirationDate : { type: 'date'}
})

const ofertaLaboral = model('ofertaLaboral', ofertaLaboralSchema)

export default ofertaLaboral