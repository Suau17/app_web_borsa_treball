import * as fs from 'fs'
import * as dotenv from 'dotenv'

import mongoose from 'mongoose';
import * as path from 'path';
import users from "#schemas/User.js";
import gestor from "#schemas/Gestor.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const usersData = JSON.parse(fs.readFileSync('/users.json', 'utf8'));
const gestorsData = JSON.parse(fs.readFileSync('/gestor.json', 'utf8'));

const seed = async () => {
    try {
        await mongoose.connect('mongodb+srv://marc:Qwerty1234@cluster0.wxnspxr.mongodb.net/pruebaBorsa?retryWrites=true&w=majority', {useNewUrlParser: true});
        for (const user of usersData) {
            const createdUser = await User.create(user);
            for (const gestor of gestorsData) {
                if(gestor.userId === user.id) {
                    gestor.user = createdUser._id;
                    await Gestor.create(gestor);
                }
            }
        }
        console.log('Seeding completed successfully');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seed();