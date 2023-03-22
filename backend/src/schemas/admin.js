import mongoose from "mongoose";
const {model ,Schema} = mongoose

const AdminSchema = new Schema({
    refUser: {
      type: mongoose.Schema.Types.ObjectID,
      ref:'User',
      cascade: true
    },
    carrec: { type: 'string', required: true, minLenght: 4, maxLength: 150 },
    telefon: { type: 'number', required: true, minLenght: 4, maxLength: 20 },
    dni: { type: 'string', required: true, minLenght: 8, maxLength: 12 },
  });
  
  const AdminModel =  model('Administrador', AdminSchema);

  export default AdminModel