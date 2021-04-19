function recordarMiddleware(req,res,next) {
    if (req.cookies.recordar != undefined && req.session.usuarioLogeado == undefined) {
        let archivoUsuario = fs.readFileSync("users.json", "utf-8");
        let usuarios;
        if (archivoUsuario == "") {
            usuarios = [];
        }
        else {
            usuarios = JSON.parse(archivoUsuario);
        }
            
        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].usuario == req.cookies.recordar){
                usuarioALoguearse = usuarios[i];
                break;
            }
        }

        req.session.usuarioLogeado = usuarioALoguearse;
    }
    
    next();
};

module.exports = recordarMiddleware;