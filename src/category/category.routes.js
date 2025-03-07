import { Router } from "express";
import { roleIsAdmin } from "../helpers/db-validators.js";
import { createCategory, editCategory, deleteCategory, getCategoryById, getCategories } from "./category.controller.js";
import { categoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     responses:
 *       201:
 *         description: Categoría creada
 *       500:
 *         description: Error al crear la categoría
 */
router.post("/categories", categoriaValidator, roleIsAdmin, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/categories/:id", getCategoryById);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error al obtener las categorías
 */
router.get("/categories", getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Editar una categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/categories/:id", editarCategoriaValidator, roleIsAdmin, editCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/categories/:id", eliminarCategoriaValidator, roleIsAdmin, deleteCategory);

export default router;