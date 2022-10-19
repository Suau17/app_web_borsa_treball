import mongoose from "mongoose";
const {model ,Schema} = mongoose

const userSchema = new Schema({
    name : { type: 'string', required: true, minLenght: 4,  maxLength: 20},    
    description : { type: 'string', required: true, minLenght: 4,  maxLength: 20},
    password : { type: 'string', required: true, minLenght: 4,  maxLength: 20}
})

const userModel = model('User', userSchema)

export default userModel