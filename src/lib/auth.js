import jwt from 'jsonwebtoken'

export const checkAuth = async (req,res, next) => {
    try {
        const token = req.cookies.tokenAcces
        console.log(req.cookies.tokenAcces)
        const tokenData = jwt.verify(token, process.env.secretWord)
        console.log(tokenData)
        if (tokenData.role) {
            next()
        } 
        else {
            res.send({error: 'no tiene permiso (rol)'})
        }
    } catch (e) {
        res.status(501).send({error: 'token no exsiste'})
    }

}

export const getUserToken = async (req) => {
        const token = req.cookies.tokenAcces
        const tokenData = jwt.verify(token, process.env.secretWord)
        if (tokenData) {
            return tokenData.id
        } 
        else {
            return 'error'
        }
    

}




