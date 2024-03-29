import * as fs from 'fs'
import * as dotenv from 'dotenv'

import mongoose from 'mongoose';
import * as path from 'path';
import users from "#schemas/User.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'mongodb+srv://marc:Qwerty1234@cluster0.wxnspxr.mongodb.net/pruebaBorsa?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(connectionString);

//node .\src\seeders\seeder.js per a fer anar el seeder

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Load data from a JSON file
  console.log(__dirname)
  const data = JSON.parse(fs.readFileSync(__dirname+'/users.json'));
  console.log(data);

  try {
    // Insert data into the database
    await users.insertMany(data);
    console.log('Data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
});