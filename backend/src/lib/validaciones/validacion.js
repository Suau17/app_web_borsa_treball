import { body, validationResult } from 'express-validator';



export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
        // console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}