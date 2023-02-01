import { JSONCookie } from "cookie-parser";
import mongoose from "mongoose";
const {model ,Schema} = mongoose


 const gestorSchema = new Schema({
     carrec : { type: 'string', required: true, minLenght: 4,  maxLength: 150},
    telefon : { type: 'number', required: true, minLenght: 4,  maxLength: 20},
    nameEmpresa : { type: 'string', required: true, minLenght: 4,  maxLength: 150},
    perfilHabilitado : {type: 'boolean', default:false},


    refUser: {type: mongoose.Schema.Types.ObjectID,ref:'User'},
     refEmpresa: {type: mongoose.Schema.Types.ObjectID,ref:'Empresa',cascade: true},

    
 })



gestorSchema.pre('deleteOne', function(next) {
    console.log('esborrant')
    next();
})

const GestorModel = model('Gestor', gestorSchema)
export default GestorModel