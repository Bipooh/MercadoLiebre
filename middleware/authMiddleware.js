function auhtMiddleware(req,res,next) {
    if(req.session.usuarioLogueado != undefined) {
        next();
    } else {
        res.send("Estas logeado");
    }
};

module.exports = auhtMiddleware;