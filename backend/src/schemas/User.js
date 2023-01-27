import mongoose from "mongoose";
const {model ,Schema} = mongoose


export const userSchema = new Schema({
    // _id -> evitar que mongo cree su propio id
<<<<<<< HEAD
     name : {type: 'string',required: true, minLenght: 2, maxLenght:20},    
     email : {type: 'string', required: true, unique: true},
     description: { type: 'string'},
     passwordHash: { type: 'string', required: true, minLenght: 4},
     rolUser: {
         type: 'string',
         enum: ["gestor", "responsable", "alumno"], required: true
     }
=======
    name : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    email : {type: 'string', required: true, unique: true},
    description: { type: 'string'},
    passwordHash: { type: 'string', required: true, minLenght: 4},
    rolUser: {
        type: 'string',
        enum: ["gestor", "responsable", "alumno", "admin"], required: true
    }
>>>>>>> 7795b982210e56fbdd625acb719df46c24167d76
    
})


const UserModel = model('User', userSchema)

export default UserModel