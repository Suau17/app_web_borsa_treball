
import * as fs from 'fs'
import * as dotenv from 'dotenv'

import mongoose from 'mongoose';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trobar l'arxiu .env
 dotenv.config({ path: ".env" });

// Carregar models
import alumnos from "#schemas/User.js"

// Llegir els arxius JSON
const alumnes = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'gestor.json'),function (err,data) {
        if (err){
           console.log(err)
        }else {
            console.log(data.toString())
        }
    })
);

// Conectar-se a la database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    //useUndefiedTopology: true
});

// Importar les dades
const importData = async () => {
    try {
        await alumnos.create(alumnes);
        console.log("Dades importades...");
        process.nextTick();
    } catch (err) {
        console.error(err);
    }
};

// Eliminar les dades
const deleteData = async () => {
    try {
        await alumnos.deleteMany();
        console.log("Dades eliminades...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Processos per instruir en la consola quan ha d'importar o eliminar les dades amb "-i" o "-d"
if (process.argv[2] === "-i"){
    importData();
} else if (process.argv[2] === "-d"){
    deleteData();
}