import Category from "./category.model.js";
import Product from "../product/product.model.js";
import getDefaultCategory from "../../configs/default.js";

export const createCategory = async (req, res) => {
    try {
        const data = req.body;

        const defaultCategory = await getDefaultCategory();
        if (!defaultCategory) {
            return res.status(500).json({
                success: false,
                message: "Categoría predeterminada no encontrada"
            });
        }

        const category = new Category(data);

        await category.save();

        res.status(200).json({
            success: true,
            category,
            defaultCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la categoría',
            error: error.message
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "La categoría no se encuentra"
            });
        }

        return res.status(200).json({
            success: true,
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoría",
            error: err.message
        });
    }
};

export const getCategories = async (_req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las categorías',
            error: err.message
        });
    }
};

export const editCategory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
                error: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categoría actualizada exitosamente",
            updatedCategory
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: err.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        const defaultCategoryId = await getDefaultCategory();
        if (!defaultCategoryId) {
            return res.status(500).json({
                success: false,
                message: "Categoría predeterminada no encontrada"
            });
        }

        await Product.updateMany({ category: id }, { category: defaultCategoryId });

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Categoría eliminada y productos transferidos a la categoría predeterminada'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
            error: err.message
        });
    }
};