import { body, param } from "express-validator";
import { prodIsInStock, productExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";


export const createProdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La  es requerida"),
    body("category").notEmpty().withMessage("La categoria es requerida"),
    body("price").notEmpty().withMessage("el precio es requerido"),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    param("prod").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("prod").custom(productExist),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(productExist),
    validarCampos,
    handleErrors
]

export const getProdByIdValidator = [
    param("prod").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("prod").custom(productExist),
    param("prod").custom(prodIsInStock),
    validarCampos,
    handleErrors
]