import fs from 'fs';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path';
import EstudiosModel from '#schemas/estudios.schema.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trobar l'arxiu .env
console.log(dotenv.config())
// Conectar-se a la database
console.log('conexion'+process.env.MONGODB_URL_TEST)
mongoose.connect(process.env.MONGODB_URL_TEST, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});
// Llegir els arxius JSON
const cursos = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'estudios.json'), 'utf8')
);
console.log('WWWWAAAAAAAASS'+cursos)

const createSeeder = async () => {
    try {
        cursos.forEach(async (course) => {
            console.log(course)
             const newCourse = new EstudiosModel(course);
             await newCourse.save();
        });
        console.log("Seeder ejecutado correctamente.");
    } catch (error) {
        console.log(`Error en el seeder: ${error}`);
    }
};

createSeeder();