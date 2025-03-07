import { body, param } from "express-validator";
import { prodIsInStock, productExist, categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";



export const createProdValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("descripction").optional().isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    body("price").isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero positivo"),
    body("category").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExist),
    validarCampos,
    handleErrors
];

export const editProductValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExist),
    body("name").optional().notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("description").optional().isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("stock").optional().isInt({ gt: 0 }).withMessage("El stock debe ser un número entero positivo"),
    body("category").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("category").optional().custom(categoryExists),
    validarCampos,
    handleErrors
];

export const getProdByIdValidator = [
    param("prod").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("prod").custom(productExist),
    param("prod").custom(prodIsInStock),
    validarCampos,
    handleErrors
]

export const getProductByCategoryValidator = [
    param("categoriaId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("categoriaId").custom(categoryExists),
    validarCampos,
    handleErrors
];