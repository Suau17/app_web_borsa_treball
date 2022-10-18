import mongoose from "mongoose";
const {model ,Schema} = mongoose

const userSchema = new Schema({
    // _id -> evitar que mongo cree su propio id
    _id: { type: 'string', _id:false},
    name : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    description : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    email : {type: 'string', required: true, unique: true},
    passwordHash: { type: 'string', required: true, minLenght: 4,  maxLength: 20}
    
})

userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject.id 
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const userModel = model('User', userSchema)

export default userModel