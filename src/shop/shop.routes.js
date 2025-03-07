import { Router } from "express";
import { addProductsToShop, getProductsFromShop, completePurchase } from "./shop.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { addProductsValidator, completePurchaseValidator } from "../middlewares/shop-validators.js";

const router = Router();

/**
 * @swagger
 * /shop:
 *   post:
 *     summary: Add products to shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Products added to shop
 *       500:
 *         description: Error adding products to shop
 */
router.post('/shop', validateJWT, addProductsValidator, addProductsToShop);

/**
 * @swagger
 * /shop:
 *   get:
 *     summary: Get products from shop
 *     responses:
 *       200:
 *         description: List of products in shop
 *       404:
 *         description: Shop not found
 *       500:
 *         description: Error getting products from shop
 */
router.get('/shop', validateJWT, getProductsFromShop);

/**
 * @swagger
 * /shop/complete-purchase/{shopId}:
 *   post:
 *     summary: Complete purchase
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *               cardNumber:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *               cvv:
 *                 type: string
 *     responses:
 *       200:
 *         description: Purchase completed successfully
 *       400:
 *         description: Incomplete payment method information
 *       404:
 *         description: Shop or product not found
 *       500:
 *         description: Error completing purchase
 */
router.post('/shop/complete-purchase/:shopId', validateJWT, completePurchaseValidator, completePurchase);

export default router;