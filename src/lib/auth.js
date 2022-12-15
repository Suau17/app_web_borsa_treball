import jwt from 'jsonwebtoken'

export const checkAuth = async (req,res, next) => {
    console.log(req.cookie.tokenAcces)
    try {
        console.log(req.headers.authorization.split(' ').pop())
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(token)
        if (tokenData._id) {
            next()
        } 
        else {
            res.status(409)
            res.send({error: 'no tienes el token'})
        }
    } catch (e) {
        res.status(501).send({error: 'no exsiste'})
    }

}