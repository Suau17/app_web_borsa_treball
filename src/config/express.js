import userRouter from '#routes/user.routes.js'
import empresaRouter from '#routes/gestor.routes.js'
import borsaRouter from '#routes/borsa.routes.js'
import express from 'express'


// motor de plantillas 
import * as path from 'path';
import { fileURLToPath } from 'url';
import { render } from 'ejs';
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
<<<<<<< HEAD
expressApp.use("/",function(req,res){
    res.render('new');
})

=======
expressApp.use("/", function (req, res) {
    res.render('new')
})
>>>>>>> a4546739ec5e8244934eff91849ffa70d4ebad27



export default expressApp
