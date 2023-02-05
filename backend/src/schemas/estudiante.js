import mongoose from "mongoose";
const {model ,Schema} = mongoose

const estudianteSchema = new Schema({
    cartaPresentacion: { type: String},
    curriculum: { type: Buffer },
    link: { type: String },
    refUser: {
      type: mongoose.Schema.Types.ObjectID,
      ref:'User',
      cascade: true
    },
    refEstudis: [{
      type: mongoose.Schema.Types.ObjectID,
      ref:'Estudios',
      cascade: true
    }],
  });
  
  const EstudianteModel =  model('Estudiante', estudianteSchema);

  export default EstudianteModel