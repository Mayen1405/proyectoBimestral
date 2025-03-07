import { body, param } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { validarJWT } from "./validar-jwt.js";
import { categoryExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";

export const categoriaValidator = [
    validarJWT,
    body("nombre")
        .notEmpty().withMessage("El nombre de la categoría es obligatorio")
        .isLength({ max: 50 }).withMessage("El nombre de la categoría no puede exceder los 50 caracteres"),
    body("descripcion")
        .optional()
        .isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    validarCampos,
    handleErrors
];

export const editarCategoriaValidator = [
    validarJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    body("nombre")
        .optional()
        .notEmpty().withMessage("El nombre de la categoría no puede estar vacío")
        .isLength({ max: 50 }).withMessage("El nombre de la categoría no puede exceder los 50 caracteres"),
    body("descripcion")
        .optional()
        .isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    validarCampos,
    handleErrors
];

export const eliminarCategoriaValidator = [
    validarJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];