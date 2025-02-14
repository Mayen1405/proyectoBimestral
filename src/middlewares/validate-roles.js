export const hasRoles = (...roles) => {
    return(req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                succes: false,
                message: "Se requiere validar el role antes de validar el toke"
            })
        }
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                succes: false,
                message: `Usuario no autorizado, el recurso requiere uno de los siguientes roles: ${roles}`
            })
        }
        next()
    }
}