import mongoose from "mongoose";
const {model ,Schema} = mongoose

const borsaSchema = new Schema({
    title : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    description : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    cicle : { type: 'string', required: true},
    capacitats : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    requisitos : { type: 'string', required: true, minLenght: 4,  maxLength: 20}
})

const borsaModel = model('User', borsaSchema)

export default borsaModel