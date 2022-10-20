import mongoose from "mongoose";
const {model ,Schema} = mongoose

const alumnoSchema = new Schema({
    dni : { type: 'string', required: true, minLenght: 9,  maxLength: 9},    
    nom : { type: 'string', required: true},
    cognoms : { type: 'string', required: true},
    data_naixement : { type: 'date', required: true},
    carnet : { type: 'boolean', required: true},
    estudis : { type: 'string', required: true},
   
    refUser: [{
        type: Schema.type.ObjectId,
        ref: 'User'
    }]
})

const alumnoModel = model('Alumno', alumnoSchema)

export default alumnoModel