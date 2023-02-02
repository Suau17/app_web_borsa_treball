import es from 'faker/lib/locales/es/index.js'
import adminRouter from '#routes/admin.routes.js'
import gestorRouter from '#routes/gestor.routes.js'
import estudianteRouter from '#routes/estudiante.routes.js'
import userRouter from '#routes/user.routes.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {checkAuthGestor, checkAuthEstudiante} from "#Lib/auth.js"


// motor de plantillas 
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { render } from 'ejs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const expressApp = express();



// middlewares
// '{ limit: '20kb' }' evita los ataques de DOS
expressApp.use(express.json({ limit: '20kb' }))
expressApp.set('view engine', 'ejs')

expressApp.set('views', path.join('src', 'views'));
console.log(path.join(__dirname, 'views'));

expressApp.set('view engine', 'ejs');


expressApp.use(express.urlencoded({extended:false}))
expressApp.use(express(JSON))
expressApp.use(cors())
expressApp.use(cookieParser())
// routes



expressApp.use('/admin',adminRouter)
expressApp.use("/gestor", checkAuthGestor ,gestorRouter)
expressApp.use('/estudiante', checkAuthEstudiante , estudianteRouter)
expressApp.use("/user",  userRouter)





export default expressApp
