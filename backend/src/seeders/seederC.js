import fs from 'fs';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path';
import EstudiosModel from "#schemas/estudios.schema.js"
import { fileURLToPath } from 'url';
import { hash } from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trobar l'arxiu .env
console.log(dotenv.config())
// Conectar-se a la database
console.log('conexion'+process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});
// Llegir els arxius JSON
const cicles = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'ciclos.json'), 'utf8')
);

const importData = async () => {
      
    try {
        // Crear usuarios
        const createdCicles = await EstudiosModel.create(cicles);
        console.log("Dades importades...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

importData();