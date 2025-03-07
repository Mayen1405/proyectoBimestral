import jwt from "jsonwebtoken"
import User from '../User/user.model.js'

export const validateJWT = async(req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No hay token en la peticion"
            })
        }

        token = token.replace(/^Bearer \s+/, "")

        const { uid } = jwt.verify(token, process.env.KEY)
        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
            })
        }

        if(!user.status){
            return res.status(400).json({
                success: false,
                message: "Usuario fue desactivado temporalmente"
            })
        }

        req.usuario = user
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
    next()
}