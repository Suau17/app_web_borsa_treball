import fs from 'fs';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path';
import User from "#schemas/User.js"
import GestorModel from "#schemas/Gestor.js"
import { fileURLToPath } from 'url';

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
const gestor = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'gestor.json'), 'utf8')
);

const importData = async () => {
    try {
        // Crear usuarios
        const createdUsers = await User.create(users);
        // Recorres todos los usuarios y comprobamos si es un gestor
        console.log(createdUsers)
        createdUsers.forEach(user => {
            if (user.rolUser === "gestor") {
                // Recorres todos los objetos de gestor 
                gestor.forEach(g => {
                    // Si refUser esta vacio lo asignamos
                    if(!g.refUser) {
                        g.refUser = user._id;
                    }
                });
            }
        });
        // aquí podrías guardar los cambios en gestor.json
        const createdGestores = await GestorModel.create(gestor);
        console.log("Dades importades...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

importData();