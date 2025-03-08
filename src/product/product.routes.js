import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getProducts, getTopSellingProducts, searchProductsByName, getProductsByCategory } from "./product.controller.js";
import { createProdValidator, deleteProductValidator, editProductValidator, getProdByIdValidator, getProductByCategoryValidator } from "../middlewares/product-validators.js";

const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       500:
 *         description: Error creating the product
 */
router.post("/products", createProdValidator, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating the product
 */
router.put("/products/:id", editProductValidator, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting the product
 */
router.delete("/products/:id", deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error getting the products
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /products/top-selling:
 *   get:
 *     summary: Get top selling products
 *     responses:
 *       200:
 *         description: List of top selling products
 *       500:
 *         description: Error getting the top selling products
 */
router.get("/products/top-selling", getTopSellingProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error searching products by name
 */
router.get("/products/search", searchProductsByName);

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products by category
 *       500:
 *         description: Error getting the products by category
 */
router.get("/products/category/:categoryId", getProductByCategoryValidator, getProductsByCategory);

export default router;