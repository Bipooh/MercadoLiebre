const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

let guestMiddleware = require("../middleware/guestMiddleware");
let auhtMiddleware = require("../middleware/authMiddleware");

const { body } = require("express-validator");

const validarLogin = [
    body("usuario")
        .notEmpty().withMessage("Escribe tu nombre de usuario").bail()
        .isLength({min:5, max:30}).withMessage("Escribe entre 8 y 30 caracteres"),
    body("contraseña")
        .notEmpty().withMessage("Escribe tu contraseña").bail()
        .isLength({min:5, max:30}).withMessage("Debe contener minimo 5 caracteres")
];

const validarRegister = [
    body("nombre")
        .notEmpty().withMessage("Completa el campo de nombre").bail()
        .isLength({min:5}).withMessage("Escribe un mínimo de 5 caracteres"),
    body("usuario")
        .notEmpty().withMessage("Completa el campo de usuario").bail()
        .isLength({min:5, max:30}).withMessage("Escribe un mínimo de 5 caracteres"),
    body("correo")
        .notEmpty().withMessage("Completa el campo de correo").bail()
        .isLength({min:5}).withMessage("Escribe un mínimo de 5 caracteres").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("domicilio")
        .notEmpty().withMessage("Completa el campo de domicilio").bail()
        .isLength({min:5}).withMessage("Escribe un mínimo de 5 caracteres"),
    body("contraseña")
        .notEmpty().withMessage("Completa el campo de contraseña").bail()
        .isLength({min:5}).withMessage("Escribe un mínimo de 5 caracteres"),
    body("fotousuario")
        .custom((value, { req }) => {
            let file = req.file;
            if (!file) {
                throw new Error("Tienes que subir una imagen");
            }
            return true;
        })
];

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./public/images/users");
    },
    filename: (req,file,cb) => {
        let filename = Date.now() + '_img' + path.extname(file.originalname);
        cb(null, filename);
    }
});

const uploadFile = multer({storage});

const userController = require("../controller/userController.js");

router.get("/register", userController.register);
router.post("/register", uploadFile.single('fotousuario'), validarRegister, userController.store);

router.get("/login", userController.login);
router.post("/login",validarLogin, userController.processLogin);

router.get("/check", function (req,res) {
    if(req.session.usuarioLogeado == undefined) {
        res.send("No estas logeado");
    }
    else {
        res.send("EL usuario logeado es: " + req.session.usuarioLogeado.usuario);
    }
});

module.exports = router;