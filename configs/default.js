import { hash } from 'argon2';
import User from '../src/User/user.model.js'
import category from '../src/category/category.model.js';

const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
        if (!adminExists) {
            const adminData = {
                name: "Admin",
                surname: "User",
                username: "admin",
                email: "admin@example.com",
                password: await hash("adminpassword"), 
                phone: "12345678",
                role: "ADMIN_ROLE"
            };
            await User.create(adminData);
            console.log("Usuario administrador creado exitosamente");
        } else {
            console.log("El usuario administrador ya existe");
        }

        const categoryExists = await category.findOne({ nombre: "Categoría Predeterminada" });
        if (!categoryExists) {
            const categoryData = {
                nombre: "Categoría Predeterminada",
            };
            await category.create(categoryData);
            console.log("Categoría predeterminada creada exitosamente");
        } else {
            console.log("La categoría predeterminada ya existe");
        }
    } catch (err) {
        console.error("Error al crear usuario administrador o categoría predeterminada:", err);
    }
};

const getDefaultCategory = async () => {
    const defaultCategory = await category.findOne({ nombre: "Categoría Predeterminada" });
    return defaultCategory ? defaultCategory._id : null;
};

export { createDefaultAdmin, getDefaultCategory };