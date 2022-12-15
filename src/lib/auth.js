import jwt from 'jsonwebtoken'

export const checkAuth = async (req,res, next) => {
    try {
        const token = req.cookies.tokenAcces
        console.log('jp')
        const tokenData = jwt.verify(token, process.env.secretWord)
        console.log(tokenData)
        if (tokenData.role == 'alumne') {
            next()
        } 
        else {
            res.status(409)
            res.send({error: 'no tiene permiso (rol)'})
        }
    } catch (e) {
        res.status(501).send({error: 'token no exsiste'})
    }

}