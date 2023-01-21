import mongoose from "mongoose";
const {model ,Schema} = mongoose

const inscripcionSchema = new Schema({
    refUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    refOfertaLaboral: { type: mongoose.Schema.Types.ObjectId, ref: 'OfertaLaboral' },
    idEmpresa : {type: mongoose.Schema.Types.ObjectID, ref:'Empresa', required:true},
    estado: {
      type: String,
      enum: ['pendiente', 'aceptado', 'rechazado'],
      required: true
    },
    fechaInscripcion: { type: Date, required: true, default: Date.now }
  });

  const InscripcionModel = model('Inscripcion', inscripcionSchema);

  export default InscripcionModel