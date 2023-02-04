import mongoose from "mongoose";
const { model, Schema } = mongoose

const estudiosSchema = new Schema({
    name: { type: 'string', required: true, minLenght: 10, maxLength: 200 },
    familiaProfesional: {
        type: 'string',
        enum: ["FAMÍLIA D'ADMINISTRACIÓ I GESTIÓ", "FAMÍLIA DE COMERÇ I MÀRQUETING",
               "FAMÍLIA D'INFORMÀTICA I COMUNICACIONS", "FAMÍLIA DE SERVEIS SOCIOCULTURALS I A LA COMUNITAT"], required: true
    },
    durada: {type: 'number', required: true, minLenght: 4,  maxLength: 20},
    asignatures: [{type: 'string', required: true, minLenght: 10, maxLength: 200 }]
});

const EstudiosModel = model('Estudios', estudiosSchema);

export default EstudiosModel