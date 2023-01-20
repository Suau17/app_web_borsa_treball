import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

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
        next()
    } catch (e) {
        res.status(501).send({error: 'token no exsiste'})
    }

}

export const checkAuth_Gestor = async (req,res, next) => {
    try {
        const tokenFromCookies = req.cookies.tokenAcces
        const tokenFromClient = req.headers.token 
        if(tokenFromCookies !== tokenFromClient) {
            return res.send({error: 'token no es el mismo'})
        }
        const tokenData = jwt.verify(tokenFromCookies, process.env.secretWord)
        const id = tokenData.id
        console.log(tokenData)
        const gestor = await GestorModel.findOne({ refUser: id })
        if (gestor.perfilHabilitado == false) {
            return 'tu perfil aun no esta habilitado'
        }
        console.log('perfil habilitado')
        next()
    } catch (e) {
        res.status(501).send({error: 'token no exsiste', msg: e})
    }

}

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




