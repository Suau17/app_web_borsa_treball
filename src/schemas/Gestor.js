import mongoose from "mongoose";
const {model ,Schema} = mongoose

const gestorSchema = new Schema({
    nomEmpresa: {type: 'string', required: true, minLenght: 4,  maxLength: 20},
    nomGestor: { type: 'string', required: true, minLenght: 3,  maxLength: 20},    
    carrec : { type: 'string', required: true, minLenght: 4,  maxLength: 150},
    telefon : { type: 'number', required: true, minLenght: 4,  maxLength: 20},
    gestor : {type: 'boolean'},
    perfilHabilitado : {type: 'boolean'},


    refUser: {type: mongoose.Schema.Types.ObjectID,ref:'User'},

    
})

const GestorModel = model('Gestor', gestorSchema)

export default GestorModel