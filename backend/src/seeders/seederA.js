import fs from 'fs';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path';
import User from "#schemas/User.js"
import EstudianteModel from "#schemas/estudiantes.controller.js"
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


const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8')
);
const alumno = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'estudiante.json'), 'utf8')
);

const importData = async () => {
    console.log (users.length);

    for(var i =0; i<  users.length; i ++) {
        users[i].passwordHash =  await hash(users[i].passwordHash,12);
      }
    try {
        // Crear usuarios
        const createdUsers = await User.create(users);
        // Recorres todos los usuarios y comprobamos si es un gestor
        console.log(createdUsers)
        createdUsers.forEach(user => {
            if (user.rolUser === "alumno") {
                // Recorres todos los objetos de alumno 
                estudiante.forEach(e => {
                    // Si refUser esta vacio lo asignamos
                    if(!e.refUser) {
                        e.refUser = user._id;
                    }
                });
            }
            
        });
        // aquí podrías guardar los cambios en gestor.json
        const createdAlumnoss = await EstudianteModel.create(alumno);
        console.log("Dades importades...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

importData();