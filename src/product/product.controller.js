import { Product } from "./product.model.js";

export const saveProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        const newProduct = new Product({ name, description, price, stock, category });
        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating the product',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating the product',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting the product',
            error: error.message
        });
    }
};

export const getProducts = async (_req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting the products',
            error: error.message
        });
    }
};

export const getBestSellingProduct = async (_req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(10);

        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting the top selling products",
            error: error.message
        });
    }
};

export const searchProductsByName = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: new RegExp(name, 'i') }).populate('category');

        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error searching products by name",
            error: error.message
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');

        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting the products by category",
            error: error.message
        });
    }
};