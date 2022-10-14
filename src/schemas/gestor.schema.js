import mongoose from "mongoose";
const {model ,Schema} = mongoose

const userSchema = new Schema({
    nom: { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    cognoms : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    carrec : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    dni : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    gestor : {type: 'boolean'},
    gestor : {type: 'boolean'}
})

const userModel = model('User', userSchema)

export default userModel