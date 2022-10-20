import userRouter from '#routes/user.routes.js'
import express from 'express'


// motor de plantillas 
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const expressApp = express();


// middlewares
expressApp.use(express.json())
expressApp.set('view engine', 'ejs')
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');


// routes
expressApp.use(userRouter)



export default expressApp
