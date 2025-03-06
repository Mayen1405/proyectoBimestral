import User from "../User/user.model.js";
import Product from "../Product/product.model.js"

/* usuarios db-validators*/

export const emailExist = async(email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`);
    }

};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async(uid = "") =>{
    const exist = await User.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
};

/* admin db validator */

export const roleIsAdmin = async(uid = "") =>{
    const user = await User.findById(uid);

    if(user.role !== 'ADMIN_ROLE'){
        throw new Error("el usuario no es un admin");
    }

    return user;
}

/* product db validator */

export const productExist = async (name = "") => {
    const existe = await Product.findOne({name})
    if(existe){
        throw new Error(`este producto ${name} ya esta registrado`)
    }
}

export const prodIsInStock = async(prod = "") =>{
    const exist = await Product.findById(prod);
    if(!exist){
        throw new Error("No se encuentra en stock");
    }
};


