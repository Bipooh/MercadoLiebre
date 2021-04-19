const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userController = {
    login: function (req,res) {
        res.render("login");
    },
    processLogin: function (req,res) {
        let errores = validationResult(req);

        if(errores.isEmpty()){
            let archivoUsuario = fs.readFileSync("users.json", "utf-8");
            let usuarios;
            if (archivoUsuario == "") {
                usuarios = [];
            }
            else {
                usuarios = JSON.parse(archivoUsuario);
            }
            
            for (let i = 0; i < usuarios.length; i++){
                if(usuarios[i].usuario == req.body.usuario && bcrypt.compareSync(req.body.contraseña, usuarios[i].contraseña)){
                    usuarioALoguearse = usuarios[i];
                    break;
                }
            }

            if (usuarioALoguearse == undefined) {
                return res.render("login", {errores: [
                    {msg: "Datos invalidos"}
                ]});
            }

            req.session.usuarioLogeado = usuarioALoguearse;

            if (req.body.recordar != undefined) {
                res.cookie("recordar", usuarioALoguearse.usuario, {maxAge: 60000});
            }

            res.redirect("/");
        }
        else {
            return res.render("login", {errores: errores.mapped()});
        }
    },
    register: function (req,res) {
        res.render("register");
    },
    store: function(req,res) {
        let errores = validationResult(req);
        if(errores.isEmpty()){
            let usuario = {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.correo,
                bday: req.body.fecha,
                domicilio: req.body.domicilio,
                perfil: req.body.compraventa,
                categorias: req.body.categorias,
                foto: req.body.fotousuario,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10)
            }
    
            let archivoUsuario = fs.readFileSync("users.json", "utf-8");
            let usuarios;
            if (archivoUsuario == "") {
                usuarios = [];
            }
            else {
                usuarios = JSON.parse(archivoUsuario);
            }
            usuarios.push(usuario);
    
            let usuariosJSON = JSON.stringify(usuarios);
            fs.writeFileSync("users.json", usuariosJSON);
    
            res.redirect("/user/register");
        }
        else {
            return res.render("register", { errores: errores.mapped(), recibido: req.body})
        }
    }
};

module.exports = userController;