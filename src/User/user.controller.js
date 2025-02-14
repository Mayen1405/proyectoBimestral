import { hash } from "argon2";
import User from "./user.model.js"

export const getUserById = async (req,res) =>{
    try{
        const {uid} = req.params;
        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "El usuario no se encuentra"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error a la hora de obtener el usuario",
            error: err
        })
    }
}

export const getUsers = async(req, res) =>{
    try{
        const {limite = 5 , desde = 0} = req.query
        const query = {status:true}
        
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),

        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error a la hora de obtener los usuarios",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    const { updateUid } = req.params; 
    const data = req.body;
    try { 
        const updatedUser = await User.findByIdAndUpdate(updateUid, data, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User with the given updateUid not found",
                error: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Information of Student updated successfully",
            updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error updating the Student",
            error: err.message
        });
    }
};

export const deleteUser = async(req, res) =>{
    try{
        
        const {uid} = req.params
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            succes: true,
            message: "El usuario ha sido eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error al intentar eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        
        const {uid} = req.params;
        const {newPassword} = req.body;
        
        const encryptedPass = await hash(newPassword);

        await User.findByIdAndUpdate(uid,{password: encryptedPass}, {new:true})

        return res.status(200).json({
            succes: true,
            message: "Contraseña actualizada"
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error a la hora de actualizar la contraseña",
            error: err.message
        })
    }
};

export const updateProfilePicture = async (req, res) => {
    try{
        const {uid} = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la peticion"
            })
        }

        const user = await User.findById(uid)
        
        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            msg: 'Foto actualizada',
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto',
            error: err.message
        })
    }
}



