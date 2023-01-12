import * as fs from 'fs'
import * as dotenv from 'dotenv'

import mongoose from 'mongoose';
import * as path from 'path';
import gestor from "#schemas/User.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'mongodb+srv://marc:Qwerty1234@cluster0.wxnspxr.mongodb.net/pruebaBorsa?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(connectionString);




const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  /*
  // Define your schema and model here
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    rolUser: { type: String, required: true },
  });
  
  const user = mongoose.model('User', userSchema);
 */
  // Load data from a JSON file
  console.log(__dirname)
  const data = JSON.parse(fs.readFileSync(__dirname+'/gestor.json'));

  try {
    // Insert data into the database
    await gestor.insertMany(data);
    console.log('Data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
});