import { body, param } from "express-validator";
import { emailExist, usernameExists, userExists, roleIsAdmin } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-error.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExist),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const adminValidator = [
    param("uid").isMongoId().withMessage("no es un admin valido"),
    param("uid").custom(roleIsAdmin),
    validarCampos,
    deleteFileOnError,
    handleErrors
]


