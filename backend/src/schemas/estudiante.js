import mongoose from "mongoose";
const {model ,Schema} = mongoose

const estudianteSchema = new Schema({
    refUser: {
      type: mongoose.Schema.Types.ObjectID,
      ref:'User',
      cascade: true
    },
    dni :  { type: String},
    cartaPresentacion: { type: String},
    curriculum: { type: String},
    link: { type: String }
  });
  
  const EstudianteModel =  model('Estudiante', estudianteSchema);

  export default EstudianteModel