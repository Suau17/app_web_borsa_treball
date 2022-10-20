import mongoose from "mongoose";
const {model ,Schema} = mongoose

const userSchema = new Schema({
    // _id -> evitar que mongo cree su propio id
    _id: { type: 'string', _id:false},
    name : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    description : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    email : {type: 'string', required: true, unique: true},
    passwordHash: { type: 'string', required: true, minLenght: 4,  maxLength: 200},
    rolUser : {type : 'string' ,
    enum: ["gestor","responsable","alumno"],
    required: true}
    
})


const UserModel = model('User', userSchema)

export default UserModel