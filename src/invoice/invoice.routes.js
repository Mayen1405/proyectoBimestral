import { Router } from "express";
import { getInvoiceHistory } from "./invoice.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get invoice history for the logged-in user
 *     responses:
 *       200:
 *         description: List of invoices
 *       404:
 *         description: No invoices found
 *       500:
 *         description: Error retrieving invoices
 */
router.get('/invoices', validateJWT, getInvoiceHistory);

export default router;