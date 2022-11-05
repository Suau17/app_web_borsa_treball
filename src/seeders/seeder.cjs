const fs = require("fs");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Trobar l'arxiu .env
dotenv.config({ path: "../.env" });

//Carregar models
const alumnos = require ("../models/alumnos.js");

//Llegir els arxius JSON
const alumnes = JSON.parse(
    fs.readFileSync('${__dirname}/seeders/alumnes.json')
);

//Conectar-se a la database
dotenv.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

//Importar les dades
const importData = async () => {
    try {
        await alumnos.create(alumnes);
        console.log("Dades importades...");
        process.nextTick();
    } catch (err) {
        console.error(err);
    }
};

//Eliminar les dades
const deleteData = async () => {
    try {
        await alumnos.deleteMany();
        console.log("Dades eliminades...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

//Processos per instruir en la consola quan ha d'importar o eliminar les dades amb "-i" o "-d"
if (process.argv[2] === "-i"){
    importData();
} else if (process.argv[2] === "-d"){
    deleteData();
}