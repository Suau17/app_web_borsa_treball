import mongoose from "mongoose";
const {model ,Schema} = mongoose

const estudianteSchema = new Schema({
    refUser: {
      type: mongoose.Schema.Types.ObjectID,
      ref:'User',
      cascade: true
    },
    cartaPresentacion: { type: String},
    curriculum: { type: Buffer }
  });
  
  const EstudianteModel =  model('Estudiante', estudianteSchema);

  export default EstudianteModel