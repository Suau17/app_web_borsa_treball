import mongoose from "mongoose";
const {model ,Schema} = mongoose


export const userSchema = new Schema({
    // _id -> evitar que mongo cree su propio id
    name : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    email : {type: 'string', required: true, unique: true},
    description: { type: 'string'},
    passwordHash: { type: 'string', required: true, minLenght: 4},
    rolUser: {
        type: 'string',
        enum: ["gestor", "responsable", "alumno", "admin"], required: true
    }
    
})


const UserModel = model('User', userSchema)

export default UserModel