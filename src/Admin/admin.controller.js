import User from "../User/user.model.js"
import Product from "../Product/product.model.js"
import { hash } from "argon2";


export const saveProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = req.product;
   
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        await prod.save();

        res.status(200).json({
            success: true,
            pet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar el producto',
            error
        });
    }
}

export const getProdById = async (req,res) =>{
    try{
        const {prod} = req.params;
        const product = await Product.findById(prod);

        if(!product){
            return res.status(404).json({
                success: false,
                message: ""
            })
        }

        return res.status(200).json({
            success: true,
            product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "",
            error: err
        })
    }
}

export const getproducts = async(req, res) =>{
    try{
        const {limite = 5 , desde = 0} = req.query
        const query = {status:true}
        
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),

        ])

        return res.status(200).json({
            success: true,
            total,
            products
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    const { updateProd } = req.params; 
    const data = req.body;
    try { 
        const updatedProd = await Product.findByIdAndUpdate(updateProd, data, { new: true });

        if (!updatedProd) {
            return res.status(404).json({
                success: false,
                message: "      ",
                error: "  "
            });
        }

        return res.status(200).json({
            success: true,
            message: "    ",
            updatedProd
        });

    } catch (err) {
        return res.status(500).json({
            message: "",
            error: err.message
        });
    }
};

