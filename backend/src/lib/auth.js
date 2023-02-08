import jwt from 'jsonwebtoken'
import GestorModel from '#schemas/Gestor.js'


export const checkAuthGestor = async (req,res, next) => {
    try {
        const tokenFromCookies = req.cookies.tokenAcces
        const tokenFromClient = req.headers.token 
        // if(tokenFromCookies !== tokenFromClient) {
        //     return res.status(498).send({error: 'token no es el mismo'})
        // }
        const tokenData = jwt.verify(tokenFromCookies, process.env.secretWord)
        const id = tokenData.id
        console.log(tokenData)
        
        const gestor = await GestorModel.findOne({ refUser: id })

        // if (gestor.perfilHabilitado === false) {
        //     console.log('tu perfil aun no esta habilitado')
        //     return res.status(401).send('tu perfil no esta habilitado. Espere a que nuestro administrador le active la cuenta. Si despues de varios dias su cuenta no esta de alta llame al 99429214')
        // }
        console.log('perfil habilitado')
        
        req.idToken = id
        next()
    } catch (e) {
        res.status(498).send({error: 'token no exsiste', msg: e})
    }
    
}

export const checkAuthEstudiante = async (req,res, next) => {
    try {
        const tokenFromCookies = req.cookies.tokenAcces
        const tokenFromClient = req.headers.token 
        // if(tokenFromCookies !== tokenFromClient) {
        //     return res.status(498).send({error: 'token no es el mismo'})
        // }
        const tokenData = jwt.verify(tokenFromCookies, process.env.secretWord)
        const id = tokenData.id
        console.log(tokenData)
        // if (tokenData.role !== 'alumno') {
        //     res.status(401).send('Tu cuenta no es de un alumno')
        // }
        req.idToken = id
        next()
    } catch (e) {
        res.status(498).send({error: 'token no exsiste', msg: e})
    }
    
}


/*
export const getUserToken = async (req) => {
    const token = req.cookies.tokenAcces
    const tokenData = jwt.verify(token, process.env.secretWord)
    if (tokenData) {
        if (tokenData.id) {
            console.log(tokenData.id)
            // const userID = mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
            return tokenData.role;
        } else {
            return null;
        }
        } 
        else {
            return 'error'
        }
        
        
    }
 */   
    export const checkAuth = async (req,res, next) => {
        try {
            const tokenFromCookies = req.cookies.tokenAcces
            console.log('cookies '+tokenFromCookies)
            const tokenFromClient = req.headers.token 
            console.log('client ' +tokenFromClient)
            if(tokenFromCookies !== tokenFromClient) {
                return res.send({error: 'token no es el mismo'})
            }
            const tokenData = jwt.verify(tokenFromCookies, process.env.secretWord)
            console.log(tokenData.name)
            
            req.idToken = tokenData.id
            next()
        } catch (e) {
            res.status(501).send({error: 'token no exsiste'})
        }
    
    }

    
    
    