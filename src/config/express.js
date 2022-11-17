import userRouter from '#routes/user.routes.js'
import empresaRouter from '#routes/gestor.routes.js'
import borsaRouter from '#routes/borsa.routes.js'
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

expressApp.set('views', path.join('src', 'views'));
console.log(path.join(__dirname, 'views'));

expressApp.set('view engine', 'ejs');

expressApp.use(express.urlencoded({extended:false}))
expressApp.use(express(JSON))

// routes




expressApp.use("/borsa/",borsaRouter)

expressApp.use("/user",userRouter)
expressApp.use("/empresa",empresaRouter)
expressApp.use("/",function(req,res){
    res.render('new');
})




export default expressApp
