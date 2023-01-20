import userRouter from '#routes/user.routes.js'
import gestorRouter from '#routes/gestor.routes.js'
import borsaRouter from '#routes/borsa.routes.js'
import empresaRouter from '#routes/empresa.routes.js'
import adminRouter from '#routes/admin.routes.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';


// motor de plantillas 
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { render } from 'ejs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const expressApp = express();

import {checkAuth, checkAuth_Gestor} from "#Lib/auth.js"


// middlewares
expressApp.use(express.json())
expressApp.set('view engine', 'ejs')

expressApp.set('views', path.join('src', 'views'));
console.log(path.join(__dirname, 'views'));

expressApp.set('view engine', 'ejs');

expressApp.use(express.urlencoded({extended:false}))
expressApp.use(express(JSON))
expressApp.use(cors())
expressApp.use(cookieParser())
// routes



expressApp.use("/borsa" ,borsaRouter)
expressApp.use('/admin',adminRouter)
expressApp.use("/user",userRouter)
expressApp.use("/gestor", checkAuth_Gestor ,gestorRouter)
expressApp.use("/empresa" ,empresaRouter)
// expressApp.use("/empresa",checkAuth ,empresaRouter)

expressApp.use("/",function(req,res){
    res.render('new');
})





export default expressApp
